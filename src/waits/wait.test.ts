import * as playwright from "playwright";

describe("Wait Test", () => {

    test("Wait for page to fully load", async () => {
        //Code execution happens within in here
        const browser = await playwright["chromium"].launch({
            headless: false,
            devtools: true
        });

        //context
        const context = await browser.newContext();

        //page
        const page = await context.newPage();

        await page.setViewportSize({
            width:1440,
            height: 9000
        });

        //navigate to the page
        await page.goto("https://www.hotstar.com/");

        var waitPeriod = 1;
        await page.waitForResponse(response => {
            console.log("Starting to wait .... " + waitPeriod);
            waitPeriod++;
            return response.request().resourceType() === "xhr"
        });

        await page.screenshot({ path: `example-${Date.now().toString()}.png` });

        await page.close();
        await context.close();
        await browser.close();
    }, 50000000);

});