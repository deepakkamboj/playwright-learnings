import { chromium } from "playwright";

describe("Video test", () => {

    test('Record a test case execution', async () => {
        const browser = await chromium.launch({
            headless: false
        });
        const context = await browser.newContext({
            recordVideo: {
                dir: './videos/',
                size: { width: 1024, height: 768 },
              }
        });
        const page = await context.newPage();

        await page.goto('https://w3schools.com');

        const path = await page.video()?.path();
        console.log("Path of video: ", path);

        await page.close();
        await context.close();
        await browser.close();
    }, 12000000);

});
