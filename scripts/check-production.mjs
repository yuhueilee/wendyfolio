const urls = ["https://wendyfolio.com/", "https://www.wendyfolio.com/"];
const expectedTitle = "<title>Wendy Lee — Software Engineer</title>";

const delay = (milliseconds) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

const checkUrl = async (url) => {
    let lastFailure = "No response received.";

    for (let attempt = 1; attempt <= 12; attempt += 1) {
        try {
            const response = await fetch(url, {
                headers: { "cache-control": "no-cache" },
                redirect: "follow",
                signal: AbortSignal.timeout(5_000),
            });
            const body = await response.text();

            if (response.ok && body.includes(expectedTitle)) {
                console.log(`Production check passed: ${response.status} ${url}`);
                return;
            }

            lastFailure = `Received ${response.status}; expected a successful response containing the portfolio title.`;
        } catch (error) {
            lastFailure = error instanceof Error ? error.message : String(error);
        }

        if (attempt < 12) await delay(5_000);
    }

    throw new Error(`Production check failed for ${url}: ${lastFailure}`);
};

await Promise.all(urls.map(checkUrl));
