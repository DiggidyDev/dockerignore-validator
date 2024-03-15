import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Dockerignore Validator",
    description:
        "A simple tool to validate your .dockerignore config against a set of filepaths.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main className="flex min-h-screen flex-col items-center justify-between p-8">
                    {children}
                </main>
            </body>
        </html>
    );
}
