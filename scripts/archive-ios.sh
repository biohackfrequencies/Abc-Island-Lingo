#!/usr/bin/env bash
# Archive ABC Island Lingo with App Store Connect automatic signing.
# This does not upload the app and does not submit it for review.
set -euo pipefail

: "${API_KEY_PATH:?}"
: "${ASC_KEY_ID:?}"
: "${ASC_ISSUER_ID:?}"
: "${APPLE_TEAM_ID:?}"
: "${GITHUB_WORKSPACE:?}"
: "${RUNNER_TEMP:?}"
: "${GITHUB_ENV:?}"

archive_path="${RUNNER_TEMP}/ABCIslandLingo.xcarchive"
log="${RUNNER_TEMP}/xcodebuild-archive.log"
echo "ARCHIVE_PATH=${archive_path}" >> "${GITHUB_ENV}"

set +e
xcodebuild \
  -project "${GITHUB_WORKSPACE}/ios/App/App.xcodeproj" \
  -scheme App \
  -configuration Release \
  -destination "generic/platform=iOS" \
  -archivePath "${archive_path}" \
  -allowProvisioningUpdates \
  -authenticationKeyPath "${API_KEY_PATH}" \
  -authenticationKeyID "${ASC_KEY_ID}" \
  -authenticationKeyIssuerID "${ASC_ISSUER_ID}" \
  archive \
  DEVELOPMENT_TEAM="${APPLE_TEAM_ID}" \
  CODE_SIGN_STYLE=Automatic \
  CODE_SIGN_ENTITLEMENTS="App/App.entitlements" \
  2>&1 | tee "${log}"
status=${PIPESTATUS[0]}
set -e

if [ "${status}" -ne 0 ]; then
  if grep -E -i -q "cloud signing permission|not authorized to perform|does not have permission" "${log}"; then
    echo "::error::Apple rejected the API key while signing. Cloud signing needs an App Store Connect Team key with the Admin role. An App Manager key cannot create the signing certificate."
  fi
  if grep -E -q "supported deployment target" "${log}"; then
    echo "::error::Xcode refused the iOS deployment target. This project is set to 15.0, which is the oldest target Xcode 26 accepts."
  fi
  exit "${status}"
fi
