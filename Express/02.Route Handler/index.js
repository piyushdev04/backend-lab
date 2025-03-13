const express = require("express");
const app = express();
const PORT = 3000;

// Middleware function (used in multiple places)
const logger = (req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
};

// Single callback route
app.get("/single", (req, res) => {
    res.send("Hello from Single Callback Route!");
});

// Multiple Callback Functions in a Route
app.get("/multiple", (req, res, next) => {
    console.log("Step 1: Logging request...");
    next();
}, (req, res) => {
    res.send("Hello from Multiple Callback Route");
});

// Array of Middleware Callbacks
const cb1 = (req, res, next) => {console.log("CB1 executed"); next(); };
const cb2 = (req, res, next) => {console.log("CB2 executed"); next(); };
const cb3 = (req, res) => {res.send("Hello from Array of Callbacks Route!"); };

app.get("/array", [cb1, cb2, cb3]);


// Combination of Array & Independent Functions
const cb0 = (req, res, next) => { console.log("CB0 executed"); next(); };

app.get("/combo", [cb0, logger], (req, res, next) => {
    console.log("Final middleware before response....");
    next();
}, (req, res) => {
    res.send("Hello from Combination Route!");
});

// Skipping Handlers with next('route')
app.get("/skip", (req, res, next) => {
    if (req.query.skip) {
        console.log("Skipping to next route....");
        next("route");
    } else {
        res.send("Processed in first handler.");
    }
});

app.get("/skip", (req, res) => {
    res.send("Skipped to this route!");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});