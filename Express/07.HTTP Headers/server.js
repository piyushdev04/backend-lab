const express = require('express');
const { message } = require('statuses');
const app = express();

app.use((req, res, next) => {
    console.log("Request Headers:", req.headers);
    next();
});

app.get("/", (req, res) => {
    res.setHeader("X-Custom-Header", "HelloWorld");
    res.json({ message: "Headers logged!" });
});

app.listen(3000, () => console.log("Server running on port 3000"));