"use client";

import { Options, Validation } from "@/app/utils/context";
import { FormEvent, HTMLProps, useState } from "react";

interface ValidationFormProps extends HTMLProps<HTMLFormElement> {
    children: React.ReactNode;
}

export function ValidationForm({ children, ...props }: ValidationFormProps) {
    // MAIN STATE
    const [dockerignore, setDockerignore] = useState("");
    const [files, setFiles] = useState("");
    const [result, setResult] = useState<boolean[]>([]);

    // CONTROL STATE
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [isFetchingRepo, setIsFetchingRepo] = useState(false);
    const [error, setError] = useState<string | undefined>();

    // OPTIONS
    const [showIgnored, setShowIgnored] = useState(true);
    const [showOptions, setShowOptions] = useState(false);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsEvaluating(true);

        const resp = await fetch("/api/validate", {
            body: JSON.stringify({
                files: files.split("\n"),
                dockerignore: dockerignore.split("\n"),
            }),
            method: "POST",
        });

        const validationResult = await resp.json();

        setResult(validationResult);
        setIsEvaluating(false);
    };

    return (
        <Options.Provider
            value={{ showIgnored, showOptions, setShowIgnored, setShowOptions }}
        >
            <Validation.Provider
                value={{
                    // Input textareas
                    dockerignore,
                    error,
                    files,
                    isFetchingRepo,
                    setDockerignore,
                    setError,
                    setFiles,
                    setIsFetchingRepo,

                    // Output textarea
                    isEvaluating,
                    result,
                    setIsEvaluating,
                    setResult,
                }}
            >
                <form
                    className="flex pb-[5%] h-full lg:h-screen flex-col gap-8 items-center justify-evenly p-8 rounded-lg min-w-full"
                    onSubmit={onSubmit}
                    {...props}
                >
                    {children}
                </form>
            </Validation.Provider>
        </Options.Provider>
    );
}
