import express from "express";
import helmet from "helmet";
import { getHealthInfo, getRandomGIF } from "./lib/Lib";

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));

/**
 * Middleware to tell google to not index anything returned.
 */
app.use((req, res, next) => {
  res.setHeader("X-Robots-Tag", "noindex");
  next();
});

app.get("/", async (req, res) => {
  const randomGIF = await getRandomGIF();

  if (req.query.key && req.query.key === process.env.KEY) {
    if (randomGIF !== undefined) {
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Expires", "0");

      res.sendFile(randomGIF);
    } else {
      console.error("[Kirlia Error]:", "Unable to get random GIF.");
      res
        .status(500)
        .send(
          '<html style="font-family: sans-serif; margin: auto; padding: 2rem 2rem;"><h1>Something has gone terribly wrong.</h1><p>Something went wrong when rendering the GIF. Ensure that <code>/static/</code> folder has GIFs.</p></html>'
        );
    }
  } else {
    console.warn(
      "[Kirlia Warn]:",
      "Unauthorized access. Requesting IP: ",
      req.ips.length ? req.ips : req.ip
    );
    res
      .status(401)
      .send(
        '<html style="font-family: sans-serif; margin: auto; padding: 2rem 2rem;"><h1>Unauthorized.</h1><p>Please provide a key when accessing files.</p></html>'
      );
  }
});

app.get("/health", (req, res) => {
  res.status(200).json(getHealthInfo());
});

app.listen(port, () => {
  console.info(
    `Kirlia is listening on ${port} - Online as of ${new Date().toLocaleDateString()} @ ${new Date().toLocaleTimeString()}`
  );
});
