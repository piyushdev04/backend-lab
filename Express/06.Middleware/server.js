const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { error } = require('console');

const app = express();
const userRouter = express.Router();

// Built-in Middleware (Parses JSON and server static files)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Third-Party Middleware (Security & Logging)
app.use(cors()); // Enables CORS
app.use(helmet()); // Secures HTTP headers
app.use(morgan('dev')); // Logs HTTP requests

// Application-Level Middleware (Logs every request)
app.use((req, res, next) => {
    console.log("User router middleware executed");
    next();
});

userRouter.get('/profile', (req, res) => {
    res.send("User Profile Page");
});

app.use('/user', userRouter); // Apply router middleware

// Error-Handling Middleware (Handles errors globally)
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));