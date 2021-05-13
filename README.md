# Playwright-Jest-TypeScript
## What is Playwright?
The playwright is a Node.js library to automate Chromium, Firefox, and WebKit with a single API. Playwright is built to enable cross-browser web testing.

Playwright by Microsoft did start as a fork of Puppeteer
Puppeteer is a node library to automate the chromium browsers with the JavaScript API
### Capabilities:
* It spans multiple pages, domains, and iframes
* Intercept network activity for stubbing and mocking network requests
* Emulate mobile devices, geolocation, permissions
* Native input events for mouse and keyboard
* Upload & download support

Playwright enables fast, reliable, and capable automation across all modern browsers

### Support for all browsers
* Test on Chromium, Firefox, and WebKit
* Test for mobile (device emulation)
* Headless and headful

### Fast and reliable execution
* Auto-wait APIs (clicks, types, etc)
* Timeout-free automation
* Lean parallelization with browser contexts
* Wide variety of selectors (locators) & shadow-dom support
* Can handle single page application

### Used tools for Playwright Integration Tests
- [playwright](https://playwright.dev/) - Playwright is a Node.js library to automate tests cases for Chromium, Firefox and WebKit with a single API
- [jest-playwright](https://github.com/playwright-community/jest-playwright) - integrates Jest and Playwright
- [expect-playwright](https://github.com/playwright-community/expect-playwright) - provides useful expect statements
- [Jest](https://jestjs.io) - provides the testing suite
- [ts-jest](https://github.com/kulshekhar/ts-jest) - provides support for TypeScript
- [eslint-plugin-jest](https://github.com/jest-community/eslint-plugin-jest) - ESLint plugin to follow best practices and anticipate common mistakes when writing tests with jest
- [jest-runner-groups](https://github.com/eugene-manuilov/jest-runner-groups) - A test runner that allows you to tag your tests and execute specific groups of tests with Jest.
- [axe-playwright](https://www.npmjs.com/package/axe-playwright) - Analyses the page and identifies accessibility issues.
- [Playwright test runner](https://github.com/microsoft/playwright-test) - Zero config cross-browser end-to-end testing for web apps. Browser automation with Playwright, Jest-like assertions and built-in support for TypeScript.

## Getting Started

Playwright is easy to install and start to work with. Just have to create a fresh project and install the playwright as a dependency.

### Create a new project
`$ npm init -y`

### Install Playwright
`$ npm install — save-dev playwright`

### Choosing Typescript as the scripting language
`$ npm install — save-dev typescript`


### Typescript config in “tsconfig.json“

```
{
  "compilerOptions": {
     "target": "es6",
     "module": "commonjs",
     "strict": true,
     "sourceMap": true
  },
  "include": ["src"]
}
```
** As per config, we should add all tests & other classes inside of the “src/” folder

### Add Jest as the test runner
`$ npm install — save-dev jest`

### As we using typescript in the project
`$ npm install — save-dev ts-jest @types/jest`

### For configuration between jest & playwright
`$ npm install — save-dev jest-playwright-preset`

### Set up Jest Config & test config with package.json
jest.config.js

```
module.exports = {
    preset: "jest-playwright-preset",
    testMatch: ["**/__tests__/**/*.+(ts|js)", "**/?(*.)+(spec|test).+(ts|js)"],
    transform: {
      "^.+\\.(ts)$": "ts-jest",
    },
    testTimeout: 20000,
    testEnvironmentOptions: {
      "jest-playwright": {
       browsers: [ "chromium", "firefox"],
        launchOptions: {
        //headless: false,
       // slowMo: 600,
        }
      }
    },
  };
```
- **preset** — Integration with jest & playwright
- **testMatch** — spec pattern that need to be run
- **transform** — typescript test compatible with jest
- **testTimeout** — global test timeout
- **testEnvironmentOptions** — test specific more configurations:
  - **browsers** — Multiple browsers that tests should be running in
  - **launchOptions** — browser launch options. can use to make tests headless and slow down test progress 

[More configs:](https://jestjs.io/docs/en/configuration)

package.json

```
"scripts": {
    "test": "jest --detectOpenHandles",
    "test.watch": "jest --watchAll"
  },
  "devDependencies": {
    "@types/jest": "^26.0.19",
    "jest": "^26.6.3",
    "jest-junit": "^12.0.0",
    "jest-playwright-preset": "^1.4.3",
    "playwright": "^1.7.1",
    "ts-jest": "^26.4.4",
    "typescript": "^4.1.3"
  }
```
- **scripts** — Define your testing scripts to run with “npm“

### With this config tests can be run as:
`$ npm test`

### For running a specific test file give its file path
`$ npm test src/specs/login.test.js`

or

`$ jest login.test.js`

### Point debug setup file through vscode code settings (.vscode > launch.json)
```
{
    "version": "0.2.0",
    "configurations": [
    {
        "name": "Debug Playwright Jest Tests",
        "type": "node",
        "request": "launch",
        "program": "${workspaceFolder}/node_modules/.bin/jest",
        "args": ["--runInBand", "--setupFilesAfterEnv='${workspaceFolder}/jest.setup.js'"],
        "windows": {
          "program": "${workspaceFolder}/node_modules/jest/bin/jest"
        },
        "console": "integratedTerminal",
        "internalConsoleOptions": "neverOpen"
      }
    ]
  }
 ```

 ### Adding reporter for test results
 Integrated jest trx results reporter to generate trx based test report. There are many other reporters available to integrate with jest for better reporting: https://github.com/jest-community/awesome-jest#reporters

`$ npm install — save-dev jest-trx-results-processor`

Add the below code in the jest.config.js

```
  reporters: [
      "default",
      [
      "jest-trx-results-processor",
      {
        "outputFile": "testResults/tests-results.trx"
      }
      ]
    ]
```

- **outputFile** — Define location and file name to create reports.


## Sample Tests
Here is a sample test for you:

```
import { Browser, BrowserContext, Page, chromium } from "playwright";

describe("Sample Test Suite", () => {

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
    });

    test("Home Page", async () => {
        console.log(await page.title());
    });

    xtest("Test to be skipped", async () => {

    });
 
    afterAll(async () => {
        await page.close();
        await context.close();
        await browser.close();
    });
});
```
### Repeating Setup For Many Tests
If you have some work you need to do repeatedly for many tests, you can use `beforeEach` and `afterEach`.

For example, let's say that several tests interact with a Unified Client App. You have a method `launchAndAuthenticate()` that must be called before each of these tests to launch and authenticate the Unified Client App, and close the browser after each of these tests. You can do this with:

```
beforeEach(async () => {
  ({ page, browser } = await launchAndAuthenticate(ViewPort));
});

afterEach(async () => {
  await browser.close();
});
```
`beforeEach` and `afterEach` can handle asynchronous code in the same ways that tests can handle asynchronous code by returning a promise. For example, if `populateDatabase()` returned a promise that resolved when the database was inserted with records, we would want to return that promise, and a method `cleanUpDatabase()` that must be called after each of these tests if you are creating any test data during test execution.

```
beforeEach(() => {
  return populateDatabase();
});

afterEach(() => {
  return cleanUpDatabase();
});
```
`populateDatabase` and `cleanUpDatabase` do not exist in default libraries. You need to implement these functions if required for test cases.

### One-Time Setup
In some cases, you only need to do setup once, at the beginning of a file. This can be especially bothersome when the setup is asynchronous, so you can't do it inline. Jest provides `beforeAll` and `afterAll` to handle this situation.

For example, if both `initializeDatabase` and `deleteDatabase` returned promises, and the entity database could be reused between tests, we could change our test code to:

```
beforeAll(() => {
  return initializeDatabase();
});

afterAll(() => {
  return deleteDatabase();
});
```

`initializeDatabase` and `deleteDatabase` do not exist in default libraries. You need to implement these functions if required for test cases.



## Playwright offer several timeout options.
One of the most usual problems with pages that contain a lot of content, because of the ads, images etc. is the load time, an exception is thrown (specifically the TimeoutError) after a page takes more than 30000ms (30 seconds) to load totally. You can configure timeouts related to waiting for elements to be available, timeouts related to navigation or global timeouts.

### page.waitForSelector
This allows your script to wait until a selector is available in the DOM.
By default this will wait up to 30 seconds. If you want to change this option, you can pass in a timeout option:


`await page.waitForSelector('h1', { timeout: 5000 });`

In a test, this might for example be useful when you want to submit a form and wait until a new DOM element is found:

```
test('should submit a form and wait for the element', async () => {
  await page.type('input[name=q]', 'HeadlessTesting');
  await page.click('input[type="submit"]');
  await page.waitForSelector('h1', { timeout: 5000 });
});
```

### page.waitForNavigation
Allows your script to wait until a navigation event is triggered.
For example: click a link, and wait until the navigation event has completed before proceeding with the script.


`await page.waitForNavigation();`

In a test, this might for example be useful when you want to submit a form and wait until a new DOM element is found:

```
const waitForNavigationPromise =  page.waitForNavigation();
await page.click('a.my-link');
await waitForNavigationPromise;
```

With `page.waitForNavigation` you can specify several waitUntil options:


### Dom Event Based Options
You can choose to wait for a DOM event to occur, such as:

- **load** - wait until the entire page, including assets, has loaded.
- **domcontentloaded** - when your HTML has loaded.

### Heuristic Based Options
This will wait until the network connections in your browser are no longer active.

- **networkidle0** - triggered when there are no more than 0 network connections for at least 500 ms.
- **networkidle2** - triggered when there are no more than 2 network connections for at least 500 ms.

Depending on your use-case, you should pick either DOM based or Heuristic based. For server-side websites, we recommend networkidle2.

### page.setDefaultNavigationTimeout
Fixing the issue globally on the tab of browser.
The option that I prefer, as I browse multiple pages in the same tab, is to remove the timeout limit on the tab that I use to browse. For example, to remove the limit you should add:

`await page.setDefaultNavigationTimeout(0);`

The `setDefaultNavigationTimeout` method available on a created page of Playwright allows you to define the timeout of the tab and expects as first argument, the value in milliseconds. A value of 0 means an unlimited amount of time. The following snippet shows how you can do it in a real example:

```
import { chromium } from "playwright";

describe("Sample Test Suite", () => {

  test("Sample Test Case", () => {

    // Create an instance of the chrome browser
    // But disable headless mode !
    const browser = await chromium.launch({
        headless: false
    });

    // Create a new page
    const page = await browser.newPage();

    // Configure the navigation timeout
    await page.setDefaultNavigationTimeout(0);

    // Navigate to some website e.g Our Code World
    await page.goto('http://w3schools.com');

    // Do your stuff
    // ...

  });
});
```

### Specifically on the current page
Alternatively, for specifical pages in case that you handle multiple pages on different variables, you should be able to specify the limit on the context as an option in the configuration object of the page.goto method:

```
await page.goto('https://w3schools.com', {
    waitUntil: 'load',
    // Remove the timeout
    timeout: 0
});
```
The following snippet shows how to do it in a real example:

```
import { chromium } from "playwright";

describe("Sample Test Suite", () => {

  test("Sample Test Case", () => {
    // Create an instance of the chrome browser
    // But disable headless mode !
    const browser = await chromium.launch({
        headless: false
    });

    // Create a new page
    const page = await browser.newPage();

    // Configure the navigation timeout
    await page.goto('https://w3schools.com', {
        waitUntil: 'load',
        // Remove the timeout
        timeout: 0
    });

    // Navigate to some website e.g Our Code World
    await page.goto('http://w3schools.com');

    // Do your stuff
    // ...
  });
});
```

Happy coding !!