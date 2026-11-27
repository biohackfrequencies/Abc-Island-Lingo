import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.papiamentolearn.app',
  appName: 'ABC Island Lingo',
  webDir: 'dist',
  plugins: {
    SystemBars: {
      // Android 15+ is edge to edge. Inject status-bar and cutout insets,
      // because env(safe-area-inset-*) is 0 on WebView versions before 140.
      insetsHandling: 'css',
      style: 'DARK',
    },
  },
};

export default config;
