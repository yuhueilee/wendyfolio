# Profile content

`profile.yml` is the canonical source for personal information, work history,
projects, education, and channel-specific inclusion rules.

## Editing rules

- Update facts and shared wording here before changing any consumer.
- Store dates as `YYYY` or `YYYY-MM`; use `null` for an ongoing role.
- Give every repeatable entry a stable `id` so generated outputs can track it.
- Use `channels` to select content for the website, resume, or LinkedIn.
- Add a channel-specific override only when that platform genuinely needs
  different wording. Do not copy an entire entry to customize one field.
- Keep layout and presentation decisions in their consumer templates.

The website validates this file in `lib/profile.ts`, adapts it to UI-facing
types in `lib/site-profile.ts`, and passes serializable data from the App Router
page into the interactive components.

The print-ready `/resume` route uses `lib/resume-profile.ts` to select resume
entries and apply only the explicitly declared resume overrides.
