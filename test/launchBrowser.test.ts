import { chromium } from "playwright";
describe('Launch Browser', () => {

    test('Open Browser', async () => {
        //browser
        const browser = await chromium.launch({
            headless: false
        });
        //browser context
        const context = await browser.newContext();

        //page
        const page = await context.newPage();

        //navigate
        await page.goto('https://www.w3schools.com/');

        await page.close();
        await context.close();
        await browser.close();
    });

});
