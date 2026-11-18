#!/usr/bin/env python3
"""Set CURRENT_PROJECT_VERSION when the workflow input asks for a new build.

An empty input leaves the number already in the Xcode project. The marketing
version is never changed.
"""

from __future__ import annotations

import os
import re
import sys
from pathlib import Path

PROJECT = Path("ios/App/App.xcodeproj/project.pbxproj")


def fail(message: str) -> None:
    print(f"::error::{message}", file=sys.stderr)
    raise SystemExit(1)


def main() -> None:
    requested = os.environ.get("BUILD_NUMBER_INPUT", "").strip()
    text = PROJECT.read_text(encoding="utf-8")
    current = set(re.findall(r"CURRENT_PROJECT_VERSION = ([^;]+);", text))
    if not requested:
        print(f"Build number input is empty. Keeping the Xcode value: {', '.join(sorted(current))}.")
        return
    if not re.fullmatch(r"[1-9][0-9]*", requested):
        fail("The build number input must be a whole number such as 12, with no letters or leading zeros.")
    if not current:
        fail("The Xcode project has no CURRENT_PROJECT_VERSION to override.")
    updated = re.sub(
        r"CURRENT_PROJECT_VERSION = [^;]+;",
        f"CURRENT_PROJECT_VERSION = {requested};",
        text,
    )
    if updated == text and current != {requested}:
        fail("Could not update CURRENT_PROJECT_VERSION.")
    PROJECT.write_text(updated, encoding="utf-8")
    print(f"Build number set to {requested} for this run. The marketing version was not changed.")


if __name__ == "__main__":
    main()
