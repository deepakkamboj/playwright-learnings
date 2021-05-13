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
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "module": "commonjs",
    "noEmit": true
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
