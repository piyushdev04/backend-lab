const http = require("http");

const server = http.createServer((req, res) => {
    console.log(`Request: ${req.method} ${req.url}`);

    res.writeHead(200, { "content-type": "text/plain" });

    switch (req.method) {
        case "GET":
            res.end("GET Request: Fetching data");
            break;
        case "POST":
            res.end("POST Request: Adding data");
            break;
        case "PUT":
            res.end("PUT Request: Updating partial data");
            break;
        case "PATCH":
            res.end("PATCH Request: Updating partial data");
            break;
        case "DELETE":
            res.end("DELETE Request: Removing data");
            break;
        default:
            res.writeHead(405, { "content-type": "text/plain" });
            res.end("Method Not Allowed");
    }
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));