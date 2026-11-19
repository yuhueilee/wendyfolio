import "server-only";

import profileData from "../content/profile.generated.json";
import { profileSchema, type Profile } from "./profile-schema";

let cachedProfile: Profile | undefined;

export const getProfile = (): Profile => {
    if (cachedProfile) return cachedProfile;

    cachedProfile = profileSchema.parse(profileData);

    return cachedProfile;
};
