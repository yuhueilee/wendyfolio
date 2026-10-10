import "server-only";

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";

import { profileSchema, type Profile } from "./profile-schema";

let cachedProfile: Profile | undefined;

export const getProfile = (): Profile => {
    if (cachedProfile) return cachedProfile;

    const path = join(process.cwd(), "content", "profile.yml");
    const source = readFileSync(path, "utf8");
    cachedProfile = profileSchema.parse(parse(source));

    return cachedProfile;
};
