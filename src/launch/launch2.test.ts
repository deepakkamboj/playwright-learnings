import * as playwright from "playwright";

describe("Test suite name", ()=>{

    test("test case name", async()=>{
        // launch browser
        const browser = await playwright["chromium"].launch({headless:false});
        //const browser = await playwright.chromium.launch({headless:false});

        // create browser context
        const context = await browser.newContext();

        // open page
        const page = await context.newPage();

        //navigate to a website
        await page.goto('https://www.w3schools.com/');

        await page.screenshot({ path: `./screenshots/example-${Date.now().toString()}.png` });

        await page.close();
        await context.close();
        await browser.close();
    });

});