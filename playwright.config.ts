import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

 use: {
  screenshot: "only-on-failure",     // takes screenshot when test fails
  video: "retain-on-failure",        // records video only on failure
  trace: "retain-on-failure",        // generates trace.zip for debugging
},

  projects: [

    // -----------------------------
    // Desktop Devices
    // -----------------------------
    // {
    //   name: 'Desktop-Large',
    //   use: {
    //     browserName: 'chromium',
    //     viewport: { width: 1920, height: 1080 }
    //   }
    // },
    // {
    //   name: 'Desktop-Medium',
    //   use: {
    //     browserName: 'chromium',
    //     viewport: { width: 1366, height: 768 }
    //   }
    // },
    // {
    //   name: 'Desktop-Small',
    //   use: {
    //     browserName: 'chromium',
    //     viewport: { width: 1280, height: 720 }
    //   }
    // },

    // -----------------------------
    // Mobile Devices
    // -----------------------------
    // {
    //   name: 'Pixel 5',
    //   use: { ...devices['Pixel 5'] }
    // },
    // {
    //   name: 'iPhone 12',
    //   use: { ...devices['iPhone 12'] }
    // },

    // -----------------------------
    // Browsers
    // -----------------------------
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    // {
    //   name: 'Firefox',
    //   use: { ...devices['Desktop Firefox'] }
    // },
    // {
    //   name: 'Safari',
    //   use: { ...devices['Desktop Safari'] }
    // }
  ],
});
