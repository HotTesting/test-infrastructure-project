global.SUT_URL = process.env.SUT_URL || "http://todomvc.com/examples/vue/";
const SELENIUM_HOST = process.env.SELENIUM_HOST || "temporary-chrome";
const SELENIUM_PORT = parseInt(process.env.SELENIUM_PORT) || 4444;

console.log("###### Selenium at", SELENIUM_HOST, SELENIUM_PORT, "will be used");
console.log("###### Website at", global.SUT_URL, "will be tested");

exports.config = {
    specs: ["./tests/*.js"],
    sync: true,
    hostname: SELENIUM_HOST,
    port: SELENIUM_PORT,
    maxInstances: 1,
    maxInstancesPerCapability: 1,
    capabilities: [
        {
            browserName: "chrome",
            maxInstances: 1
        }
    ],
    reporters: [
        "spec",
        [
            "junit",
            {
                outputDir: "./reports/",
                outputFileFormat: function(options) {
                    return `results-${options.cid}.xml`;
                }
            }
        ],
        [
            "allure",
            {
                outputDir: "allure-results",
                // disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: true
            }
        ]
    ],

    framework: "mocha",
    logLevel: "silent",
    mochaOpts: {
        ui: "bdd",
        timeout: 120000 // in ms
    },

    before: function() {
        browser.setWindowSize(1280, 1024);
    },
    /**
     * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) ends.
     * @param {Object} test test details
     */
    afterTest: function(test) {
        // faster than reload browser
        browser.execute(
            "window.localStorage.clear(); window.sessionStorage.clear()"
        );
        browser.refresh();

        // browser.reloadSession();
    }
};
