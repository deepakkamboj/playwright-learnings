// Wait for page to full load
import { chromium } from "playwright";
describe('Launch Browser', () => {

    test('Wait test', async () => {

        //Code execution happens within in here
        const browser = await chromium.launch({
            headless: false,
            devtools: true
        });

        //context
        const context = await browser.newContext();

        //page
        const page = await context.newPage();

        //navigate to the page
        await page.goto("https://www.hotstar.com/");

        var waitPeriod = 1;
        await page.waitForResponse(response => {
            console.log("Starting to wait .... " + waitPeriod);
            waitPeriod++;
            return response.request().resourceType() === "xhr"
        })

        await page.screenshot({ path: `hotstar-${Date.now}.png` });

        await browser.close();
    });

});