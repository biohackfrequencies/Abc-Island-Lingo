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

## Versions for this release

- iOS marketing version **1.0.1**, build **12**
- Android `versionName` **1.0.1**, `versionCode` **4**
- npm package version **1.0.1**

Android was already at `versionName` 1.2 / `versionCode` 3. Play Store updates follow `versionCode`, so this build uses **4**, which is a valid upgrade. The public `versionName` is **1.0.1** so it matches the iOS 1.0.1 release. Nothing here was submitted to the stores.

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
