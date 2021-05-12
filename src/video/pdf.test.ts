import { chromium } from "playwright";

describe("PDF Test", ()=>{

    test("Generate a PDF", async()=>{
        // launch browser
        const browser = await chromium.launch();

        // create browser context
        const context = await browser.newContext();

        // open page
        const page = await context.newPage();

        //navigate to a website
        await page.goto('https://www.w3schools.com/');

        // Generates a PDF with 'screen' media type.
        await page.emulateMedia({media: 'screen'});
        await page.pdf({path: 'page.pdf'});

        await page.close();
        await context.close();
        await browser.close();
    }, 120000000);

});

