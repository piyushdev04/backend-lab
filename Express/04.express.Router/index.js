const express = require("express");
const app = express();
const PORT = 3000;

// Import the birds router
const birds = require("./birds");

// Use the router with a base path
app.use("/birds", birds);

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});