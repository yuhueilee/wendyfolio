import type { Metadata } from "next";
import { getSiteProfile } from "../lib/site-profile";
import "./globals.css";

const profile = getSiteProfile();

export const metadata: Metadata = {
    title: `${profile.name} — Software Engineer`,
    description: profile.seoDescription,
    icons: {
        icon: `/logoNew.png`,
        apple: `/logoNew.png`,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
