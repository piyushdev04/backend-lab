require("dotenv").config();
const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require('./models/url');

const app = express();
const PORT = process.env.PORT || 8001;

connectToMongoDB(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.set("view engine", "ejs");

app.use(express.json());

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.end(`
    <html>
      <head></head>
      <body>
        <ol>
          ${allUrls.map(url => `<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length}</li>`).join()}
        </ol>
      </body>
    </html>
  `);
})
app.use("/url", urlRoute);

app.get('/url/:shortId', async(req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));