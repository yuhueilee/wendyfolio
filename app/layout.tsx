import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Wendy Lee — Software Engineer",
    description:
        "Portfolio of Wendy Lee (Lee Yu Huei), a software engineer working across backend services, responsive frontends, and the tests and tooling that keep both trustworthy.",
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
