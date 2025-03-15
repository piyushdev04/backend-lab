const express = require("express");
const users = require('./MOCK_DATA.json');
const status = require("statuses");

const app = express();
const PORT = 8000;

// Routes

app.get("/api/users", (req, res) => {
    return res.json(users);
});

app.route('/api/users/:id')

    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);
    })
    .put((req, res) => {
        return res.json({ status: "Pending"});
    })
    .delete((req, res) => {
        return res.json({ status: "Pending" });
    });

app.post("/api/users", (req, res) => {
    return res.join({ status: "pending"});
});

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));