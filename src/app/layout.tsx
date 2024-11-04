import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Dockerignore Validator",
    description:
        "A simple tool to test your dockerignore config against a list of files.",
    keywords:
        "dockerignore, docker, ignore, validator, test, files, list, config, tool, utility, web, app, application, website, online, free, open-source, source, code, repository, github, vw, codes, vw.codes",
};

type RootLayoutProps = Readonly<{
    children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main className="relative flex max-w-screen min-h-screen lg:py-0 flex-col items-center justify-between p-8">
                    {children}
                    <div className="absolute flex items-center shadow gap-4 dark:bg-slate-700 bg-white 2xl:px-6 p-4 rounded-t-xl italic bottom-0">
                        <span>
                            A{" "}
                            <Link
                                className="hover:text-[#ff3bac] underline"
                                href="https://vw.codes"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                vw.codes
                            </Link>{" "}
                            project
                        </span>
                        <Link
                            className="hover:text-[#ff3bac]"
                            href="https://github.com/DiggidyDev/dockerignore-validator"
                            aria-label="GitHub Repository"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <BsGithub className="w-6 h-6 hover:text-[#ff3bac] cursor-pointer" />
                        </Link>
                    </div>
                </main>
            </body>
        </html>
    );
}
