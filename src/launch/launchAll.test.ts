import { webkit, firefox, chromium, Browser, Page, } from 'playwright';
const browserTypes = [chromium, firefox, webkit];
describe.each([
    [chromium.name(), chromium],
    [firefox.name(), firefox],
    [webkit.name(), webkit],
])('Run tests on %p browser: ', (_browserName, browserType) => {

    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
        browser = await browserType.launch({ headless: false });
        const context = await browser.newContext();
        page = await context.newPage();
    });

    afterAll(async () => {
        await browser.close();
    });

    it('Open Google', async () => {
        await page.goto('https://www.google.com');
        await page.screenshot({ path: `example-${Date.now().toString()}.png` });
    });

});
