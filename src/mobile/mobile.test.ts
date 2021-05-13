import { webkit, devices } from "playwright"

describe("Mobile and geolocation Test", () => {

   const iPhone11 = devices['iPhone 11 Pro'];

  test('Recorded script', async () => {
    const browser = await webkit.launch();
    const context = await browser.newContext({
      ...iPhone11, //spread operator
      locale: 'en-US',
      geolocation: { longitude: 12.492507, latitude: 41.889938 },
      permissions: ['geolocation']
    });
    const page = await context.newPage();
    await page.goto('https://maps.google.com');
    await page.click('text="Your location"');
    await page.waitForRequest(/.*preview\/pwa/);
    await page.screenshot({ path: './screenshots/iphone.png' });
    await browser.close();
  });

});