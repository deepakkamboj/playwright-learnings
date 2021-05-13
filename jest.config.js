module.exports = {
    name: 'integration',
    displayName: 'Integration Tests',
    verbose: true,
    preset: "jest-playwright-preset",
    testMatch: ["**/?(*.)+(spec|test).+(ts|js)"],
    transform: {
      "^.+\\.(ts)$": "ts-jest",
    },
    testTimeout: 120000,

    reporters: [
      "default",
      [
      "jest-trx-results-processor",
      {
        "outputFile": "testResults/tests-results.trx"
      }
      ],
      [
        "jest-junit",
         {
          classNameTemplate: (vars) => {
            return vars.classname.toUpperCase();
          },
          "outputDirectory": "testReports",
          "outputName": "test_report.xml"
        }
      ]

    ]
  };
