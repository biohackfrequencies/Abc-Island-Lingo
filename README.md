# ABC Island Lingo

ABC Island Lingo teaches Papiamento to English, Dutch, and Spanish speakers. It is a free download. Units 1 and 2 are free. Later units unlock with a one-time premium purchase through RevenueCat.

The app runs on iOS and Android with Capacitor, and the same UI runs in the browser for development.

## Stack

Capacitor 8, Vite, React 19, TypeScript, Tailwind CSS, and Zustand. Progress, the display name, streak, and XP are stored on the device.

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run build
npx cap sync
```

`npm run build` typechecks and writes the web app to `dist`. `npx cap sync` copies that build into the iOS and Android projects.

## Send a build to TestFlight

There is no Mac in this setup. GitHub builds the iOS app when you ask it to.

1. Open the repository on GitHub and choose Actions.
2. Choose **iOS TestFlight** in the left column.
3. Choose **Run workflow**. Leave the branch as the one you want to ship.
4. The build number box can stay empty. Empty uses the number already in Xcode, which is **15** for this release. Type a higher whole number only when Apple says that build was already uploaded.
5. Run it.

The workflow builds the web app, syncs the iOS project, archives it, signs it, and uploads that build to TestFlight. It does not submit the app for App Store review.

It uses the GitHub-hosted `macos-15` runner. The `macos-26` label never started a machine on this account, and `macos-latest` points at that same image, so neither is used. `macos-15` opens Xcode 16.4 by default, and App Store Connect rejects that older SDK. The workflow switches to the newest Xcode 26 installed on the image before it archives. The iOS deployment target stays **15.0**, which is the oldest target Xcode 26 accepts.

Signing uses the App Store Connect API key already stored as these four repository secrets, and no others: `ASC_KEY_ID`, `ASC_ISSUER_ID`, `ASC_KEY_P8_BASE64` (the `.p8` file as one line of base64), and `APPLE_TEAM_ID`. The key needs the Admin role so Apple can create the certificate. The bundle id is `com.papiamentolearn.app`. The marketing version is **1.0.3**. Purchases use StoreKit and RevenueCat. The old `com.apple.developer.in-app-purchase` entitlements key is not used, because automatic signing cannot put that key in a profile.

This app uses Swift packages, so the workflow does not install CocoaPods.

## Versions for this release

- iOS marketing version **1.0.3**, build **15**
- Android `versionName` **1.0.3**, `versionCode` **7**
- npm package version **1.0.3**

Android `versionCode` **7** is the next Play upload after **6**. The public `versionName` is **1.0.3**, matching iOS. The Play listing icon is `store/google-play-icon-512.png`, the same ABC mark as the launcher. Nothing here was submitted to the stores.

## Update lessons and the phrase of the week

Extra lessons, extra dictionary words, and the phrase of the week live in one text file:

`content/remote.json`

The app already contains a copy of that file, so the phone works with no network. On launch it also asks GitHub for the same file:

`https://raw.githubusercontent.com/biohackfrequencies/Abc-Island-Lingo/main/content/remote.json`

That address is the file on the public `main` branch. No separate website is required. GitHub Pages was not used, because Pages needs an extra setting. This file is edited in the browser and the app reads the text directly.

If the download works, the app saves it on the device and uses it offline next time. If the phone is offline, or the file is not valid, the app keeps the last good copy. If there is no saved copy yet, it uses the copy that shipped inside the app.

The file is words and lesson questions only. The app does not download or run code from it. That stays within Apple guideline 2.5.2.

### How to publish a change

1. On GitHub, open `content/remote.json` on the `main` branch.
2. Click the pencil to edit it.
3. Commit the change to `main`.
4. Open the app again. The new phrase and lessons show up after the download. GitHub can take a few minutes to serve the new file.

Keep lesson and word ids the same once people may have finished them. New ids must start with `remote-` and use only lowercase letters, numbers, and hyphens. Set `"premium": false` for a free lesson and `"premium": true` for a lesson that needs the one-time purchase.

Question types the app already knows how to show:

- `multiple-choice` and `translate`: `options` is the list of answers, and `answer` is one of those options.
- `spelling`: `answer` is what the learner should type. Do not include `options`.
- `order`: `options` is the words in the correct order, and `answer` is those words joined with spaces.

### Example

```json
{
  "phraseOfTheWeek": {
    "papiamento": "Kon ta bai?",
    "en": "How are you?",
    "nl": "Hoe gaat het?",
    "es": "¿Cómo estás?"
  },
  "vocabulary": [
    {
      "id": "remote-dushi-korsou",
      "papiamento": "Dushi Kòrsou",
      "en": "Sweet Curaçao",
      "nl": "Lief Curaçao",
      "es": "Dulce Curazao",
      "partOfSpeech": "phrase"
    }
  ],
  "lessons": [
    {
      "id": "remote-greeting",
      "title": "Kon ta bai?",
      "premium": false,
      "level": "A1",
      "description": {
        "en": "A short greeting you can use this week.",
        "nl": "Een korte groet voor deze week.",
        "es": "Un saludo corto para esta semana."
      },
      "questions": [
        {
          "type": "multiple-choice",
          "prompt": {
            "en": "How do you say “How are you?”",
            "nl": "Hoe zeg je “Hoe gaat het?”",
            "es": "¿Cómo se dice “¿Cómo estás?”?"
          },
          "options": ["Kon ta bai?", "Bon nochi", "Masha danki"],
          "answer": "Kon ta bai?"
        }
      ]
    }
  ]
}
```
