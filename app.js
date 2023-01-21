const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

// make HTTP requests to external APIs
// use native https node module
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
    const api_key = "JOuVeyB3rKL3SuBENYdzNYDuJlbaIC6atdpLK1sx";
    const query = req.body.date;
    const url = "https://api.nasa.gov/planetary/apod?api_key=" + api_key + "&date=" + query;
        
        https.get(url, function(response) {
            console.log(response.statusCode);

            //turn json data into a js object
            response.on("data", function(data) {
                const planetaryData = JSON.parse(data);
                const date = planetaryData.date;
                const title = planetaryData.title;
                const imgUrl = planetaryData.url;
                res.write("<p>The date is " + date + "<\p>");
                res.write("<h1>The image title is " + title + "<\h1>");
                res.write("<img src=" + imgUrl + ">");
                res.send();

            });
        });
});


app.listen(3000, function() {
    console.log("Server is listening on port 3000");
})