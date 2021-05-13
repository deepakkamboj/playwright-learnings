import { chromium, Browser, BrowserContext, Page } from "playwright";
import { injectAxe, checkA11y } from "axe-playwright";


describe("Accessibility Tests", () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    beforeAll(async () => {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto("https://w3schools.com");
        await injectAxe(page);
    });

    test("Find accessibility violations", async () => {
        await checkA11y(page);
    });

    afterAll(async () => {
        await page.close();
        await context.close();
        await browser.close();
    });
});