const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.route("/book")
    .get((req, res) => {
        res.send("Get a random book");
    })
    .post((req, res) => {
        res.send("Add a new book");
    })
    .put((req, res) => {
        res.send("Update the book");
    })
    .delete((req, res) => {
        res.send("Delete the book");
    });

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});