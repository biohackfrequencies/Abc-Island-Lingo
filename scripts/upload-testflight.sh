#!/usr/bin/env bash
# Upload the exported IPA to App Store Connect for TestFlight processing.
# This script never submits the app for App Store review.
set -euo pipefail

: "${RUNNER_TEMP:?}"
: "${ASC_KEY_ID:?}"
: "${ASC_ISSUER_ID:?}"
: "${IOS_BUNDLE_ID:?}"
: "${IOS_MARKETING_VERSION:?}"
: "${IOS_BUILD_NUMBER:?}"

expected_bundle="com.papiamentolearn.app"
ipa=""
for candidate in "${RUNNER_TEMP}/export"/*.ipa; do
  if [ -f "${candidate}" ]; then
    ipa=${candidate}
    break
  fi
done
if [ -z "${ipa}" ]; then
  echo "::error::Export did not produce an IPA, so nothing was uploaded."
  exit 1
fi

payload=$(mktemp -d)
unzip -q "${ipa}" -d "${payload}"
app_path=""
for candidate in "${payload}"/Payload/*.app; do
  if [ -d "${candidate}" ]; then
    app_path=${candidate}
    break
  fi
done
plist="${app_path}/Info.plist"
if [ -z "${app_path}" ] || [ ! -f "${plist}" ]; then
  echo "::error::The IPA has no app Info.plist, so nothing was uploaded."
  exit 1
fi

bid=$(/usr/libexec/PlistBuddy -c 'Print :CFBundleIdentifier' "${plist}")
ver=$(/usr/libexec/PlistBuddy -c 'Print :CFBundleShortVersionString' "${plist}")
build=$(/usr/libexec/PlistBuddy -c 'Print :CFBundleVersion' "${plist}")
entitlements=$(codesign -d --entitlements :- "${app_path}" 2>/dev/null || true)
rm -rf "${payload}"

echo "IPA bundle id: ${bid}"
echo "IPA version: ${ver}"
echo "IPA build: ${build}"

if [ "${bid}" != "${expected_bundle}" ] || [ "${bid}" != "${IOS_BUNDLE_ID}" ]; then
  echo "::error::Refusing to upload. The IPA bundle id is '${bid}'. This workflow only uploads ABC Island Lingo (${expected_bundle})."
  exit 1
fi
if [ "${ver}" != "${IOS_MARKETING_VERSION}" ] || [ "${build}" != "${IOS_BUILD_NUMBER}" ]; then
  echo "::error::Refusing to upload. The IPA is version ${ver} (${build}), but this run expected ${IOS_MARKETING_VERSION} (${IOS_BUILD_NUMBER})."
  exit 1
fi
if ! printf '%s' "${entitlements}" | grep -q "com.apple.developer.in-app-purchase"; then
  echo "::error::Refusing to upload. The signed app is missing the In-App Purchase entitlement."
  exit 1
fi

log="${RUNNER_TEMP}/upload.log"
set +e
if xcrun --find altool >/dev/null 2>&1; then
  xcrun altool --upload-app -f "${ipa}" -t ios --apiKey "${ASC_KEY_ID}" --apiIssuer "${ASC_ISSUER_ID}" 2>&1 | tee "${log}"
  status=${PIPESTATUS[0]}
elif xcrun --find iTMSTransporter >/dev/null 2>&1; then
  echo "altool is not on this Xcode. Uploading with iTMSTransporter."
  xcrun iTMSTransporter -m upload -assetFile "${ipa}" -apiKey "${ASC_KEY_ID}" -apiIssuer "${ASC_ISSUER_ID}" 2>&1 | tee "${log}"
  status=${PIPESTATUS[0]}
else
  echo "::error::This Xcode has neither altool nor iTMSTransporter, so the IPA was not uploaded."
  exit 1
fi
set -e

if [ "${status}" -ne 0 ]; then
  if grep -E -i -q "redundant binary upload|bundle version must be higher|already been used|CFBundleVersion must be higher" "${log}"; then
    echo "::error::Apple already has build ${build} for version ${ver}. Run this workflow again and enter a higher build number. The marketing version stays ${ver}."
  fi
  if grep -E -i -q "unable to authenticate|invalid api key|failed to authenticate" "${log}"; then
    echo "::error::Apple rejected the API key during upload. Check ASC_KEY_ID, ASC_ISSUER_ID, and ASC_KEY_P8_BASE64."
  fi
  exit "${status}"
fi

echo "Uploaded ${bid} version ${ver} (${build}) to App Store Connect for TestFlight processing."
echo "This did not submit the app for App Store review."
