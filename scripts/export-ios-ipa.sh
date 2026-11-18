#!/usr/bin/env bash
# Write an App Store IPA on disk. destination is export, so this does not upload.
set -euo pipefail

: "${ARCHIVE_PATH:?}"
: "${API_KEY_PATH:?}"
: "${ASC_KEY_ID:?}"
: "${ASC_ISSUER_ID:?}"
: "${APPLE_TEAM_ID:?}"
: "${RUNNER_TEMP:?}"

export_dir="${RUNNER_TEMP}/export"
options="${RUNNER_TEMP}/ExportOptions.plist"
log="${RUNNER_TEMP}/xcodebuild-export.log"
mkdir -p "${export_dir}"

cat > "${options}" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>method</key>
  <string>app-store-connect</string>
  <key>destination</key>
  <string>export</string>
  <key>signingStyle</key>
  <string>automatic</string>
  <key>teamID</key>
  <string>${APPLE_TEAM_ID}</string>
  <key>uploadSymbols</key>
  <true/>
  <key>manageAppVersionAndBuildNumber</key>
  <false/>
</dict>
</plist>
EOF

set +e
xcodebuild -exportArchive \
  -archivePath "${ARCHIVE_PATH}" \
  -exportPath "${export_dir}" \
  -exportOptionsPlist "${options}" \
  -allowProvisioningUpdates \
  -authenticationKeyPath "${API_KEY_PATH}" \
  -authenticationKeyID "${ASC_KEY_ID}" \
  -authenticationKeyIssuerID "${ASC_ISSUER_ID}" \
  2>&1 | tee "${log}"
status=${PIPESTATUS[0]}
set -e

if [ "${status}" -ne 0 ]; then
  if grep -E -i -q "cloud signing permission|not authorized to perform|does not have permission" "${log}"; then
    echo "::error::Apple rejected the API key while signing the IPA. Cloud signing needs an App Store Connect Team key with the Admin role."
  fi
  exit "${status}"
fi
