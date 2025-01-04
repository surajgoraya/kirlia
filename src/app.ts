import express from "express";
import helmet from "helmet";
import { getHealthInfo, getRandomGIF } from "./lib/services";
import { templates } from "./lib/templates";
import { processEnvironmentConfig } from "./lib/configuration";

const app = express();
const port = process.env.PORT || 3000;

if (process.env.IS_PROXIED) {
  app.enable("trust proxy");
}

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: processEnvironmentConfig({config: process.env.CORS_POLICY})
    },
  })
);

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
      res.status(500).send(templates.errors.serverError);
    }
  } else {
    console.warn(
      "[Kirlia Warn]:",
      "Unauthorized access. Requesting IP: ",
      req.ips.length ? req.ips : req.ip
    );
    res.status(401).send(templates.errors.notAuthorized);
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
