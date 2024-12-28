import { log } from "console";
import { readdirSync, readFileSync } from "fs";
// import * as packageInfo from "../../package.json";
import path from "path";

function getHealthInfo() {
  const files = readdirSync(path.join(process.cwd(), "static")).length;
  const version = process.env.npm_package_version;

  return { numberOfFiles: files, appVersion: version };
}

function getRandomGIF() {
  const files = readdirSync(path.join(process.cwd(), "static"));

  const allFiles = files.length - 1;
  const index = Math.round(Math.random() * allFiles);
  const file = files[index];

  const filePath = path.join(process.cwd(), "static", file);

  return filePath;
}

export { getRandomGIF, getHealthInfo };
