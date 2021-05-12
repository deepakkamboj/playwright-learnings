import { chromium } from "playwright";

describe("Test suite name", () => {

    test('Open letcode', async () => {
        const browser = await chromium.launch({
            headless: false
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://letcode.in/');
        await page.click("text=Log in");
        await page.fill("input[name='email']", 'deepakkamboj@gmail.com');
        await page.fill("input[name='password']", 'Test@1234');
        await page.click('button:text("LOGIN")')
        await page.click('"Sign out"');
        await browser.close();
    }, 600000);

});