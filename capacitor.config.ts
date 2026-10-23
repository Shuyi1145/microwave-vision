import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.microwavevision.learning',
  appName: '\u5fae\u6ce2\u89c6\u754c',
  webDir: 'dist',
  plugins: {SystemBars: {insetsHandling: 'disable'}}
};

export default config;
