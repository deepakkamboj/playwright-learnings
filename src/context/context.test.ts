import { firefox } from "playwright"

describe("Context Test", () => {

    test('Evaluate in browser context Test', async () => {

        const browser = await firefox.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://www.w3schools.com/');
        const dimensions = await page.evaluate(() => {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
                deviceScaleFactor: window.devicePixelRatio
            }
        });
        console.log(dimensions);

        await browser.close();
    });

});