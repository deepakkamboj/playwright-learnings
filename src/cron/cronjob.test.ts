import { chromium } from "playwright";

describe("Test suite name", () => {
  test("test case name", async () => {
    // launch browser
    const browser = await chromium.launch({ headless: false });

    // create browser context
    const context = await browser.newContext();

    // open page
    const page = await context.newPage();

    //await page.goto('https://www.ritiriwaz.com/email-cron-job/');
    const urls = [
      "https://www.softleo.com/",
      "https://www.softleo.com/blog/what-is-ionic-framework",
      "https://www.softleo.com/blog/tips-to-choose-a-perfect-domain-name",
      "https://www.softleo.com/blog/10-successful-strategies-for-holiday-promotions-for-service-based-companies",
      "https://www.softleo.com/blog/how-to-create-website-using-wordpress",
      "https://www.softleo.com/blog/the-best-and-most-popular-wordpress-themes-of-2021",
      "https://www.softleo.com/blog/the-best-strategies-for-email-marketing",
      "https://www.softleo.com/blog/test-automation-using-playwright",
      "https://www.softleo.com/blog/syntax-highlighter-using-prism-library",
      "https://www.softleo.com/blog/the-ultimate-guide-to-content-writing",
      "https://www.softleo.com/blog/the-ultimate-guide-to-digital-marketing",
      "https://www.softleo.com/blog/the-ultimate-guide-to-google-sitelinks",
      "https://www.softleo.com/blog/the-ultimate-guide-to-youtube-marketing",
      "https://www.softleo.com/about-us.html",
      "https://www.softleo.com/contact-us.html",
      "https://www.softleo.com/authors.html",
      "https://www.softleo.com/services-seo.html",
      "https://www.softleo.com/services-social-media-management.html",
      "https://www.softleo.com/services-link-building.html",
      "https://www.softleo.com/services-email-marketing.html",
      "https://www.softleo.com/services-website-development.html",
      "https://www.softleo.com/services-mobile-app-development.html",
      "https://www.softleo.com/services-ppc-management.html",
      "https://www.softleo.com/services-content-writing.html",
      "https://www.softleo.com/training.html",
      "https://www.softleo.com/blog",
      "https://www.softleo.com/project-ritiriwaz.html",
      "https://www.softleo.com/project-thesportsmirror.html",
      "https://www.softleo.com/project-iplpulse.html",
      "https://www.softleo.com/project-kambojsociety.html",
      "https://www.softleo.com/category/search-engine-optimization",
      "https://www.softleo.com/category/digital-marketing",
      "https://www.softleo.com/category/email-marketing",
      "https://www.softleo.com/category/website-development",
      "https://www.softleo.com/category/content-writing",
      "https://www.softleo.com/category/wordpress",
      "https://www.softleo.com/category/test-automation",
      "https://www.softleo.com/category/ionic-framework",
      "https://www.softleo.com/category/service-companies",
      "https://www.softleo.com/category/website-hosting",
      "https://www.softleo.com/category/mobile-application-development",
      "https://www.softleo.com/category/smart-devices",
    ];

    const random = Math.floor(Math.random() * urls.length);
    console.log(random, urls[random]);

    //navigate to a website
    await page.goto(urls[random]);

    await page.screenshot({
      path: `./screenshots/cronjob-${Date.now().toString()}.png`,
    });

    const random2 = Math.floor(Math.random() * urls.length);
    console.log(random, urls[random2]);

    //navigate to a website
    await page.goto(urls[random2]);

    await page.close();
    await context.close();
    await browser.close();
  });
});
