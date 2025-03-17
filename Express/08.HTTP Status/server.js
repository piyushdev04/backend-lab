const { error } = require('console');
const express = require('express');
const { message } = require('statuses');
const app = express();

// 200 OK
app.get('/success', (req, res) => {
    res.status(200).json({ message: "Request successful!" });
});

// 201 Created
app.post('/user', (req, res) => {
    res.status(201).json({ message: "User created!" });
});

// ***only for Simulated Server Error (500)
app.get('/error', (req, res) => {
    throw new Error("Simulated Server Error");
});

// 400 Bad Request
app.get('/bad-request', (req, res) => {
    res.status(400).json({ error: "Invalid request" });
});

// 404 Not Found
app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});

// 500 Internal Server Error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong" });
});


app.listen(3000, () => console.log("Server running on port 3000"));