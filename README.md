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
