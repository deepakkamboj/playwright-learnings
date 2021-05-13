module.exports = {
    preset: "jest-playwright-preset",
    testMatch: ["**/?(*.)+(spec|test).+(ts|js)"],
    transform: {
      "^.+\\.(ts)$": "ts-jest",
    },
    testTimeout: 500000
  };
