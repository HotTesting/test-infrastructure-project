exports.config = {
    specs: ["./tests/*.js"],
    sync: true,
    // services: ["selenium-standalone"],
    // port: 4844,
    //port: 4444, 
    hostname: "temporary-chrome",
    //path: '/wd/hub',
    maxInstances: 1,
    maxInstancesPerCapability: 1, 
    capabilities: [
        {
            browserName: "chrome",
            maxInstances: 1
        }
    ],
    reporters: ["spec"],
    baseUrl: "http://todo-app:80",
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
