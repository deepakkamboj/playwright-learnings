import { chromium } from "playwright";

describe("Test suite name", ()=>{

    test("test case name", async()=>{
        // launch browser
        const browser = await chromium.launch({headless:false});

        // create browser context
        const context = await browser.newContext();

        // open page
        const page = await context.newPage();

        //navigate to a website
        await page.goto('https://www.ritiriwaz.com/email-cron-job/');

        await page.screenshot({ path: `./screenshots/cronjob-${Date.now().toString()}.png` });

        await page.close();
        await context.close();
        await browser.close();
    });

});