const express = require("express");
const fs = require("fs");
const path = require("path");
const { message } = require("statuses");

const filePath = path.join(__dirname, "MOCK_DATA.json");
let users = require(filePath);

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const saveUsersToFile = (users) => {
    fs.writeFileSync(
        filePath,
        JSON.stringify(users, null, 2),
        "utf-8"
    );
};

app.get("/api/users", (req, res) => res.json(users));

app.route("/api/users/:id")
    .get((req, res) => {
        const user = users.find(u => u.id === Number(req.params.id));
        res.json(user || { message: "User not found" });
    })
    .put((req, res) => {
        const index = users.findIndex(u => u.id === Number(req.params.id));
        if (index === -1) return res.status(404).json({ message: "User not found" });

        users[index] = { ...req.body, id: users[index].id };
        saveUsersToFile(users);
        res.json({ status: "success", user: users[index] });
    })
    .patch((req, res) => {
        const index = users.findIndex(u => u.id === Number(req.params.id));
        if (index === -1) return res.status(404).json({ message: "User not found" });

        users[index] = { ...users[index], ...req.body };
        saveUsersToFile(users);
        res.json({ status: "success", user: users[index] });
    })
    .delete((req, res) => {
        const index = users.findIndex(u => u.id === Number(req.params.id));
        if(index === -1) return res.status(404).json({ message: "User not found" });

        users.splice(index, 1);
        saveUsersToFile(users);
        res.json({ status: "success", message: "User deleted"});
    });

app.post("/api/users", (req, res) => {
    if (!req.body.first_name || !req.body.last_name || !req.body.email) {
        return res.status(400).json({ message: "First name, last name, and email are required" });
    }

    const newUser = { ...req.body, id: users.length + 1 };
    users.push(newUser);
    saveUsersToFile(users);

    res.json({ status: "success", id: newUser.id });
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));