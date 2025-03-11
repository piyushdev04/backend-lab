const http = require("http");

const server = http.createServer((req, res) => {
    console.log(`Request recevied: ${req.url}`);

    res.writeHead(200, { "content-type": "text/plain"});

    switch (req.url) {
        case "/":
            res.end("Welcome to the Home page!");
            break;
        case "/about":
            res.end("This is the About Page.");
            break;
        case "/contact":
            res.end("This is the About Page.");
            break;
        default:
            res.writeHead(404, { "content-type": "text/plain"});
            res.end("404 Not found");
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http:localhost:${PORT}`);
});