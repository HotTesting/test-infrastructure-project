exports.config = {
    specs: ["./tests/*.js"],
    sync: true,
    // services: ["selenium-standalone"],
    port: 4844,
    hostname: "temporary-chrome",
    capabilities: [
        {
            browserName: "chrome"
        }
    ],
    reporters: ["spec"],
    baseUrl: "http://todo-app:8080",
    framework: "mocha",
    logLevel: "silent",
    mochaOpts: {
        ui: "bdd",
        timeout: 120000 // in ms
    },

    /**
     * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) ends.
     * @param {Object} test test details
     */
    afterTest: function(test) {
        // faster than reload browser
        // browser.execute('window.localStorage.clear(); window.sessionStorage.clear()')
        // browser.refresh()

        browser.reloadSession();
    }
};
