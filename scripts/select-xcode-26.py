#!/usr/bin/env python3
"""Pick the newest Xcode 26 on the GitHub macOS runner and export DEVELOPER_DIR.

The macos-15 image boots Xcode 16.4 by default. App Store Connect rejects
uploads built with that older SDK. Xcode 26 is installed beside it, and this
script selects the newest Xcode 26 on the machine.
"""

from __future__ import annotations

import os
import plistlib
import sys
from pathlib import Path


def version_of(app: Path) -> tuple[tuple[int, ...], str] | None:
    plist_path = app / "Contents" / "Info.plist"
    if not plist_path.is_file():
        return None
    with plist_path.open("rb") as handle:
        info = plistlib.load(handle)
    raw = str(info.get("CFBundleShortVersionString", "")).strip()
    parts: list[int] = []
    for piece in raw.split("."):
        if not piece.isdigit():
            break
        parts.append(int(piece))
    if not parts:
        return None
    return tuple(parts), raw


def main() -> None:
    found: dict[Path, tuple[tuple[int, ...], str]] = {}
    applications = Path("/Applications")
    if applications.is_dir():
        for app in applications.glob("Xcode*.app"):
            parsed = version_of(app)
            if parsed and parsed[0][0] == 26:
                found[app.resolve()] = parsed

    if not found:
        print(
            "::error::This runner has no Xcode 26. App Store Connect rejects uploads "
            "built with the default Xcode 16.4 on macos-15. Xcode 26 should be "
            "installed under /Applications.",
            file=sys.stderr,
        )
        raise SystemExit(1)

    app, (_parts, raw) = max(found.items(), key=lambda item: item[1][0])
    developer_dir = app / "Contents" / "Developer"
    if not developer_dir.is_dir():
        print(f"::error::Xcode {raw} at {app} has no developer directory.", file=sys.stderr)
        raise SystemExit(1)

    print(f"Using Xcode {raw} ({developer_dir})")
    github_env = os.environ.get("GITHUB_ENV")
    if github_env:
        with open(github_env, "a", encoding="utf-8") as handle:
            handle.write(f"DEVELOPER_DIR={developer_dir}\n")


if __name__ == "__main__":
    main()
