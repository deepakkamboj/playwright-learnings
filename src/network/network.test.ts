import { webkit } from "playwright"

describe("Network Test", () => {

    test('Intercept network requests', async () => {
        const browser = await webkit.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        // Log and continue all network requests
        page.route('**', route => {
            console.log(route.request().url());
            route.continue();
        });

        await page.goto('http://w3schools.com');
        await browser.close();
    });

});