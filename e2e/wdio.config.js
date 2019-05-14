const chromium = require("chromium");
const chromedriver = require("chromedriver");

// Making BaseURL available everywhere
global.SUT_URL = process.env.SUT_URL || "http://todomvc.com/examples/vue/";

exports.config = {
    specs: ["./tests/*.js"],
    sync: true,
    //services: ["selenium-standalone"],
    port: 9515, // default for ChromeDriver
    path: "/",
    // ...
    // services: ["chromedriver"],
    // options
    //chromeDriverArgs: ['--port=9515', '--url-base=\'/\''], // default for ChromeDriver
    //chromeDriverLogs: './',
    maxInstancesPerCapability: 1,
    capabilities: [
        {
            browserName: "chrome",
            "goog:chromeOptions": {
                args: ["--no-sandbox --headless"],
                binary: chromium.path
            },
            maxInstances: 1
        }
    ],
    reporters: ["spec"],
    baseUrl: global.SUT_URL,
    framework: "mocha",
    logLevel: "silent",
    mochaOpts: {
        ui: "bdd",
        timeout: 120000 // in ms
    },
    onPrepare: function() {
        chromedriver.start();
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
    },
    onComplete: function() {
        chromedriver.stop();
    }
};
