import { z } from "zod";

const channelSchema = z.enum(["website", "resume", "linkedin"]);
const channelsSchema = z.array(channelSchema).min(1);
const yearSchema = z.string().regex(/^\d{4}$/);
const monthSchema = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/);

const highlightSchema = z.object({
    id: z.string().min(1),
    text: z.string().min(1),
});

const experienceSchema = z.object({
    id: z.string().min(1),
    company: z.string().min(1),
    location: z.string().min(1),
    role: z.string().min(1),
    start: monthSchema,
    end: monthSchema.nullable(),
    technologies: z.array(z.string().min(1)).min(1),
    highlights: z.array(highlightSchema).min(1),
    channels: channelsSchema,
});

const projectSchema = z.object({
    id: z.string().min(1),
    kind: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    technologies: z.array(z.string().min(1)).min(1),
    links: z.object({
        demo: z.string().url().optional(),
        source: z.string().url().optional(),
    }),
    media: z.array(
        z.discriminatedUnion("type", [
            z.object({
                type: z.literal("video"),
                path: z.string().min(1),
            }),
            z.object({
                type: z.literal("image-set"),
                path: z.string().min(1),
                count: z.number().int().positive(),
            }),
        ])
    ),
    channels: channelsSchema,
});

const datedChannelEntrySchema = z.object({
    id: z.string().min(1),
    channels: channelsSchema,
});

export const profileSchema = z.object({
    schemaVersion: z.literal(1),
    lastUpdated: z.string().date(),
    person: z.object({
        name: z.object({
            display: z.string().min(1),
            legal: z.string().min(1),
            preferred: z.string().min(1),
        }),
        headline: z.string().min(1),
        email: z.string().email(),
        website: z.string().url(),
        profiles: z.object({
            github: z.string().url(),
            linkedin: z.string().url(),
        }),
    }),
    introductions: z.object({
        hero: z.string().min(1),
        about: z.string().min(1),
        seo: z.string().min(1),
    }),
    experience: z.array(experienceSchema).min(1),
    projects: z.array(projectSchema).min(1),
    education: z.array(
        datedChannelEntrySchema.extend({
            institution: z.string().min(1),
            degree: z.string().min(1),
            specialization: z.string().min(1),
            start: yearSchema,
            end: yearSchema,
            grade: z.string().min(1),
        })
    ),
    certifications: z.array(
        datedChannelEntrySchema.extend({
            name: z.string().min(1),
            issued: monthSchema,
        })
    ),
    activities: z.array(
        datedChannelEntrySchema.extend({
            name: z.string().min(1),
            location: z.string().min(1),
            description: z.string().min(1),
        })
    ),
    skills: z.object({
        featured: z.array(z.string().min(1)).min(1),
    }),
    assets: z.object({
        baseUrl: z.string().url(),
        profileImage: z.object({
            path: z.string().min(1),
            formats: z.array(z.enum(["avif", "webp", "jpg"])).min(1),
        }),
        resume: z.object({
            outputPath: z.string().min(1),
        }),
    }),
    channels: z.object({
        resume: z.object({
            pageSize: z.literal("letter"),
            sectionOrder: z.object({
                main: z.array(z.string().min(1)),
                sidebar: z.array(z.string().min(1)),
            }),
        }),
        linkedin: z.object({
            lastSynchronized: z.string().date().nullable(),
        }),
    }),
});

export type Profile = z.infer<typeof profileSchema>;
