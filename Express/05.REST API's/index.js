const express = require("express");
const fs = require('fs');
const users = require('./MOCK_DATA.json');
const status = require("statuses");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// Routes

app.get("/api/users", (req, res) => {
    return res.json(users);
});

app.route('/api/users/:id')

    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user || { message: "User not found" });
    })
    .put((req, res) => {
        return res.json({ status: "Pending"});
    })
    .delete((req, res) => {
        return res.json({ status: "Pending" });
    });

app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "success", id: users.length});
    });
});

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));