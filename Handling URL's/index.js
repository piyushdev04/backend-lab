const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const queryParams = parsedUrl.query;

    if (parsedUrl.pathname === "/favicon.ico") {
        res.writeHead(204, { "Content-Type": "text/plain" }); // 204 = No Content
        return res.end();
    }
    console.log("Full URL:", req.url);
    console.log("Path:", parsedUrl.pathname);
    console.log("Query Parameters:", parsedUrl.query);

    res.writeHead(200, { "Content-Type": "text/html" });

    res.write("<h1>Query Parameters</h1>");
    res.write("<ul>");

    for (const key in queryParams) {
        res.write(`<li><strong>${key}:</strong> ${queryParams[key]}</li>`);
    }

    res.write("</ul>");
    res.end();
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));