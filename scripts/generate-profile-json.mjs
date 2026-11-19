import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const profileUrl = new URL("../content/profile.yml", import.meta.url);
const generatedUrl = new URL("../content/profile.generated.json", import.meta.url);
const checkOnly = process.argv.includes("--check");

const source = await readFile(profileUrl, "utf8");
const generated = `${JSON.stringify(parse(source), null, 2)}\n`;

let current;

try {
    current = await readFile(generatedUrl, "utf8");
} catch (error) {
    if (error?.code !== "ENOENT") throw error;
}

if (current !== generated) {
    if (checkOnly) {
        throw new Error(
            `${fileURLToPath(generatedUrl)} is stale. Run npm run generate:profile.`
        );
    }

    await writeFile(generatedUrl, generated);
    console.log(`Generated ${fileURLToPath(generatedUrl)}`);
}
