const express = require("express");
const router = express.Router();

// Middleware specific to this router
const timeLog = (req, res, next) => {
    console.log("Time:", new Date().toISOString());
    next();
};
router.use(timeLog);

// Define the routes
router.get("/", (req, res) => {
    res.send("🐦 Birds home page");
});

router.get("/about", (req, res) => {
    res.send("About Bird");
});

router.get("/species/:name", (req, res) => {
    res.send(`🦜 Bird species: ${req.params.name}`)
});

module.exports = router;