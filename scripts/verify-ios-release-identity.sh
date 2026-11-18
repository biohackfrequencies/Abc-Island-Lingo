#!/usr/bin/env bash
# Confirm the iOS app that will be archived is ABC Island Lingo.
# The marketing version is left as it is in the Xcode project.
set -euo pipefail

python3 - <<'PY'
import json
import os
import re
import sys

EXPECTED_BUNDLE_ID = "com.papiamentolearn.app"
PROJECT = "ios/App/App.xcodeproj/project.pbxproj"
PACKAGE = "ios/App/CapApp-SPM/Package.swift"
INVALID_ENTITLEMENT = "com.apple.developer.in-app-purchase"

def fail(message: str) -> None:
    print(f"::error::{message}", file=sys.stderr)
    raise SystemExit(1)

def split_build_settings(text: str) -> list[str]:
    blocks = []
    for part in text.split("buildSettings = {"):
        lines = []
        for line in part.splitlines():
            if line.strip() == "};":
                break
            lines.append(line)
        blocks.append("\n".join(lines))
    return blocks

def field(block: str, key: str) -> str:
    match = re.search(rf"^\s*{re.escape(key)} = (.*?);\s*$", block, re.M)
    if not match:
        fail(f"The Xcode project is missing {key} in an app build configuration.")
    return match.group(1).strip().strip('"')

text = open(PROJECT, encoding="utf-8").read()
target_blocks = [
    block for block in split_build_settings(text) if "PRODUCT_BUNDLE_IDENTIFIER" in block
]
if len(target_blocks) < 2:
    fail("Could not find the Debug and Release settings for the iOS app.")

def values(key: str) -> set[str]:
    return {field(block, key) for block in target_blocks}

bundle_ids = values("PRODUCT_BUNDLE_IDENTIFIER")
versions = values("MARKETING_VERSION")
builds = values("CURRENT_PROJECT_VERSION")
teams = values("DEVELOPMENT_TEAM")
styles = values("CODE_SIGN_STYLE")
deployment = values("IPHONEOS_DEPLOYMENT_TARGET")

if bundle_ids != {EXPECTED_BUNDLE_ID}:
    found = ", ".join(sorted(bundle_ids))
    fail(
        "Refusing to build. This workflow only ships ABC Island Lingo "
        f"({EXPECTED_BUNDLE_ID}). The Xcode project has bundle id: {found}."
    )
if len(versions) != 1 or len(builds) != 1:
    fail(
        "Debug and Release do not use the same version and build number. "
        f"Versions: {sorted(versions)}. Builds: {sorted(builds)}."
    )
if styles != {"Automatic"}:
    fail(
        "The Xcode project is not set to automatic signing "
        f"({', '.join(sorted(styles))}). This workflow cannot sign it."
    )
if len(teams) != 1:
    fail(f"Debug and Release use different Apple teams: {sorted(teams)}.")
if "CODE_SIGN_ENTITLEMENTS" in text:
    fail(
        "The Xcode project still sets CODE_SIGN_ENTITLEMENTS. "
        "This app has no profile entitlements. Leave that setting unset."
    )
if INVALID_ENTITLEMENT in text:
    fail(
        f"{INVALID_ENTITLEMENT} is not a provisioning-profile entitlement. "
        "Automatic signing cannot include it. Remove it. StoreKit purchases do not need it."
    )
if "StoreKit.framework" not in text:
    fail("StoreKit.framework is not linked. Purchases need that system framework.")
package = open(PACKAGE, encoding="utf-8").read()
if "RevenuecatPurchasesCapacitor" not in package:
    fail("The iOS project no longer links the RevenueCat package, so purchases would not work.")
if deployment != {"15.0"}:
    fail(
        "The iOS deployment target must be 15.0. Xcode 26 cannot ship a lower target. "
        f"The project currently has: {', '.join(sorted(deployment))}."
    )

version = next(iter(versions))
build = next(iter(builds))
team = next(iter(teams))
if not re.fullmatch(r"[1-9][0-9]*", build):
    fail(f"The build number in the Xcode project is not a whole number: {build}")

package_version = json.load(open("package.json", encoding="utf-8"))["version"]
if package_version != version:
    fail(
        "The version numbers do not match, so this workflow will not ship. "
        f"Xcode marketing version is {version}. package.json is {package_version}."
    )

secret_team = os.environ.get("APPLE_TEAM_ID", "").strip()
if secret_team and secret_team != team:
    fail(
        f"APPLE_TEAM_ID ({secret_team}) does not match the team in the Xcode project ({team}). "
        "Fix the secret or the project so they are the same before signing."
    )

print(f"App: ABC Island Lingo ({EXPECTED_BUNDLE_ID})")
print(f"Marketing version: {version}")
print(f"Build: {build}")
print(f"Team: {team}")
print("Signing: Automatic")
print(f"iOS deployment target: {', '.join(sorted(deployment))}")
print("Entitlements: none. In-App Purchase stays available through StoreKit.")
print("The marketing version was not changed.")

github_env = os.environ.get("GITHUB_ENV")
if github_env:
    with open(github_env, "a", encoding="utf-8") as handle:
        handle.write(f"IOS_MARKETING_VERSION={version}\n")
        handle.write(f"IOS_BUILD_NUMBER={build}\n")
        handle.write(f"IOS_BUNDLE_ID={EXPECTED_BUNDLE_ID}\n")
        handle.write(f"IOS_TEAM_ID={team}\n")
PY
