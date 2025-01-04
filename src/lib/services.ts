import { readdirSync, readFileSync } from "fs";
import path from "path";

function getHealthInfo() {
  const files = readdirSync(path.join(process.cwd(), "static")).length;
  const version = process.env.npm_package_version;

  return { status: "alive", GIFs: files, appVersion: version };
}

function getRandomGIF() {
  const files = readdirSync(path.join(process.cwd(), "static"));

  const randomIndex = Math.floor(Math.random() * files.length);

  const file = files[randomIndex];
  const filePath = path.join(process.cwd(), "static", file);

  return filePath;
}

export { getRandomGIF, getHealthInfo };
