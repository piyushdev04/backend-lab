const http = require("http");

const server = http.createServer((req, res) => {
    console.log(`Request received: ${req.url}`);

    if (req.url === "/favicon.ico") {
        res.writeHead(204, { "content-type": "text/plain"});
        return res.end();
    }

    res.writeHead(200, {"content-type": "text/plain"});

    switch (req.url) {
        case "/":
            res.end("Welcome to the Home Page!");
            break;
        case "/about":
            res.end("This is the About Page.");
            break;
        case "/contact":
            res.end("Contact us at: contact@example.com");
            break;
        default:
            res.writeHead(404, { "content-type": "text/plain" });
            res.end("404 Not Found");
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});