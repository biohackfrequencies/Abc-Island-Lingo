#!/usr/bin/env bash
# Archive ABC Island Lingo without signing.
# A fresh GitHub runner has no Apple Development certificate. Automatic
# signing during archive would create one, and this account is already at
# Apple's certificate limit. This step does not call Apple and does not
# pass -allowProvisioningUpdates or the API key.
# Signing happens later, in export-ios-ipa.sh, with Apple's cloud-managed
# App Store distribution.
# Do not pass CODE_SIGN_ENTITLEMENTS. This app has no profile entitlements.
# com.apple.developer.in-app-purchase is not one, and Xcode rejects the archive
# when that key is requested. StoreKit purchases do not need it.
set -euo pipefail

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
  archive \
  CODE_SIGNING_ALLOWED=NO \
  CODE_SIGNING_REQUIRED=NO \
  CODE_SIGN_IDENTITY="" \
  2>&1 | tee "${log}"
status=${PIPESTATUS[0]}
set -e

if [ "${status}" -ne 0 ]; then
  if grep -E -q "maximum number of certificates|iOS App Development" "${log}"; then
    echo "::error::Archive tried to create or use an Apple Development certificate. It must stay unsigned. Signing belongs in the export step."
  fi
  if grep -E -q "supported deployment target" "${log}"; then
    echo "::error::Xcode refused the iOS deployment target. This project is set to 15.0, which is the oldest target Xcode 26 accepts."
  fi
  exit "${status}"
fi
