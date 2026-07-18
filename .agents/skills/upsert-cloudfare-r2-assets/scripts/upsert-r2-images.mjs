#!/usr/bin/env node

import { execFile } from "node:child_process";
import { mkdtemp, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import sharp from "sharp";

const execFileAsync = promisify(execFile);

const args = process.argv.slice(2);
const option = (name, fallback) => {
    const index = args.indexOf(name);
    if (index === -1) return fallback;
    const value = args[index + 1];
    if (!value || value.startsWith("--")) {
        throw new Error(`${name} requires a value`);
    }
    return value;
};
const hasFlag = (name) => args.includes(name);
const required = (name) => {
    const value = option(name);
    if (!value) throw new Error(`Missing required option: ${name}`);
    return value;
};
const quality = (name, fallback) => {
    const value = Number(option(name, String(fallback)));
    if (!Number.isInteger(value) || value < 1 || value > 100) {
        throw new Error(`${name} must be an integer from 1 to 100`);
    }
    return value;
};
const runWrangler = async (...commandArgs) => {
    const { stdout, stderr } = await execFileAsync(
        "npx",
        ["wrangler", ...commandArgs],
        { maxBuffer: 10 * 1024 * 1024 }
    );
    if (stdout.trim()) process.stdout.write(stdout);
    if (stderr.trim()) process.stderr.write(stderr);
};

const sourcePattern = required("--source");
const bucket = required("--bucket");
const prefix = required("--prefix").replace(/^\/+|\/+$/g, "");
const cacheControl = option(
    "--cache-control",
    "public,max-age=31536000,immutable"
);
const webpQuality = quality("--webp-quality", 82);
const avifQuality = quality("--avif-quality", 55);
const jpgQuality = quality("--jpg-quality", 85);
const dryRun = hasFlag("--dry-run");
const keepTemp = hasFlag("--keep-temp");

const sourceDirectory = path.resolve(path.dirname(sourcePattern));
const sourceName = path.basename(sourcePattern);
const escapedPattern = sourceName
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replaceAll("*", ".*")
    .replaceAll("?", ".");
const matcher = new RegExp(`^${escapedPattern}$`, "i");
const collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
});
const sourceFiles = (await readdir(sourceDirectory))
    .filter((name) => matcher.test(name))
    .sort(collator.compare)
    .map((name) => path.join(sourceDirectory, name));

if (sourceFiles.length === 0) {
    throw new Error(`No files matched ${sourcePattern}`);
}

const workDirectory = await mkdtemp(
    path.join(tmpdir(), "upsert-cloudflare-r2-assets-")
);
const formats = [
    { extension: "avif", contentType: "image/avif" },
    { extension: "webp", contentType: "image/webp" },
    { extension: "jpg", contentType: "image/jpeg" },
];

try {
    const objects = [];
    for (const [index, sourceFile] of sourceFiles.entries()) {
        const number = index + 1;
        const avif = path.join(workDirectory, `${number}.avif`);
        const webp = path.join(workDirectory, `${number}.webp`);
        const jpg = path.join(workDirectory, `${number}.jpg`);

        await Promise.all([
            sharp(sourceFile).avif({ quality: avifQuality }).toFile(avif),
            sharp(sourceFile).webp({ quality: webpQuality }).toFile(webp),
            sharp(sourceFile)
                .flatten({ background: "#ffffff" })
                .jpeg({ quality: jpgQuality, mozjpeg: true })
                .toFile(jpg),
        ]);

        for (const format of formats) {
            const filename = `${number}.${format.extension}`;
            objects.push({
                contentType: format.contentType,
                key: `${prefix}/${filename}`,
                localFile: path.join(workDirectory, filename),
            });
        }
    }

    if (dryRun) {
        for (const object of objects) {
            console.log(`[dry-run] ${bucket}/${object.key}`);
        }
        process.exitCode = 0;
    } else {
        for (const object of objects) {
            await runWrangler(
                "r2",
                "object",
                "put",
                `${bucket}/${object.key}`,
                "--file",
                object.localFile,
                "--content-type",
                object.contentType,
                "--cache-control",
                cacheControl,
                "--remote"
            );

            const remoteFile = path.join(
                workDirectory,
                `remote-${path.basename(object.localFile)}`
            );
            await runWrangler(
                "r2",
                "object",
                "get",
                `${bucket}/${object.key}`,
                "--file",
                remoteFile,
                "--remote"
            );
            await execFileAsync("cmp", [object.localFile, remoteFile]);
            console.log(`Verified ${bucket}/${object.key}`);
        }
    }
} finally {
    if (keepTemp) {
        console.log(`Temporary files: ${workDirectory}`);
    } else {
        await rm(workDirectory, { recursive: true, force: true });
    }
}
