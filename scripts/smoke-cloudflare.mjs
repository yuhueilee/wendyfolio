import { spawn } from "node:child_process";
import { once } from "node:events";
import { fileURLToPath } from "node:url";

const port = process.env.CLOUDFLARE_SMOKE_PORT ?? "8787";
const url = `http://127.0.0.1:${port}/`;
const expectedTitle = "<title>Wendy Lee — Software Engineer</title>";
const wranglerPath = fileURLToPath(
    new URL("../node_modules/wrangler/bin/wrangler.js", import.meta.url)
);

const worker = spawn(
    process.execPath,
    [wranglerPath, "dev", "--local", "--port", port],
    {
        env: { ...process.env, WRANGLER_SEND_METRICS: "false" },
        stdio: ["ignore", "pipe", "pipe"],
    }
);

let workerOutput = "";

for (const stream of [worker.stdout, worker.stderr]) {
    stream.on("data", (chunk) => {
        const text = chunk.toString();
        workerOutput += text;
        process.stdout.write(text);
    });
}

const delay = (milliseconds) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

const stopWorker = async () => {
    if (worker.exitCode !== null) return;

    worker.kill("SIGTERM");
    await Promise.race([once(worker, "exit"), delay(5_000)]);

    if (worker.exitCode === null) worker.kill("SIGKILL");
};

let lastFailure = "The Worker did not become ready.";

try {
    const deadline = Date.now() + 30_000;

    while (Date.now() < deadline) {
        if (worker.exitCode !== null) {
            throw new Error(
                `Wrangler exited with code ${worker.exitCode}.\n${workerOutput}`
            );
        }

        try {
            const response = await fetch(url, {
                signal: AbortSignal.timeout(2_000),
            });
            const body = await response.text();

            if (response.ok && body.includes(expectedTitle)) {
                console.log(`Cloudflare Worker smoke test passed: ${response.status} ${url}`);
                process.exitCode = 0;
                break;
            }

            lastFailure = `Received ${response.status}; expected a successful response containing the portfolio title.`;
        } catch (error) {
            lastFailure = error instanceof Error ? error.message : String(error);
        }

        await delay(500);
    }

    if (process.exitCode !== 0) {
        throw new Error(`${lastFailure}\n${workerOutput}`);
    }
} finally {
    await stopWorker();
}
