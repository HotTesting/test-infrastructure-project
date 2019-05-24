
const localPath =
    "/Users/oleksandrkhotemskyi/TEST_RESOURCES/images/Sample_Image_JPEG_1000x1000.jpeg";
const containerPath = "/TEST_RESOURCES/images/Sample_Image_JPEG_1000x1000.jpeg";

describe("selenoid file", function() {
    it.skip("upload", function() {
        browser.url("http://the-internet.herokuapp.com/upload");

        $(`div.example input[type="file"]`).setValue(containerPath);

        browser.pause(1000);
        $("div.example #file-submit").click();
        browser.pause(10000);

        const uploadedFiles = $("#uploaded-files").getText();
        console.log(uploadedFiles);
    });

    it.skip("download", function() {
        browser.url("http://the-internet.herokuapp.com/download");
        let filename = $(".example a").getText();
        $(".example a").click();
        console.log("SessionID is", browser.sessionId);
        // console.log(`http://localhost:4444/download//`)

        let qs = require('querystring')
        const urlToFile = `http://${process.env.SELENIUM_HOST}:4444/download/${
            browser.sessionId
        }/${qs.escape(filename)}`;
        browser.pause(5000)
        console.log(urlToFile);
        const http = require("http");
        const fs = require("fs");


        const file = fs.createWriteStream(filename);
        http.get(urlToFile, function(response) {
            response.pipe(file);
        });
        browser.pause(10000);
    });
});
