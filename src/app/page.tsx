"use client";

import { useState } from "react";
import { TextArea } from "./components/TextArea/TextArea";
import { Label } from "./components/Label/Label";

const processFiles = (
    files: string,
    result: boolean[],
    showExcluded: boolean
) => {
    const filepaths = files.split("\n");

    const isExcluded = (fp: string, i: number) =>
        showExcluded ? result[i] : !result[i];

    return filepaths.filter(isExcluded).join("\n");
};

export default function Home() {
    const [dockerignore, setDockerignore] = useState("");
    const [files, setFiles] = useState("");

    const [result, setResult] = useState<boolean[]>([]);
    const [showExcluded, setShowExcluded] = useState(true);

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const res = await fetch("/api/validate", {
            body: JSON.stringify({
                files: files.split("\n"),
                dockerignore: dockerignore.split("\n"),
            }),
            method: "POST",
        });

        setResult(await res.json());
        setIsLoading(false);
    };

    return (
        <form
            onSubmit={onSubmit}
            className="flex flex-col gap-8 items-center justify-center p-8 rounded-lg min-w-full"
        >
            <div className="flex flex-row gap-8 min-h-[70vh] min-w-full">
                <TextArea
                    label=".dockerignore"
                    name="dockerignore"
                    setValue={setDockerignore}
                    value={dockerignore}
                    required
                />

                <TextArea
                    label="Files"
                    setValue={setFiles}
                    value={files}
                    required
                />

                {isLoading ? (
                    <TextArea.Loading label="Matching patterns..." />
                ) : (
                    <TextArea
                        label={showExcluded ? "Ignored Files" : "Files to Copy"}
                        disabled
                        value={processFiles(files, result, showExcluded)}
                    />
                )}
                <div
                    data-cy="options-container"
                    className="flex flex-row-reverse items-center gap-2"
                >
                    <div className="flex flex-row-reverse items-center gap-2">
                        <Label
                            text="Show excluded files?"
                            htmlFor="showExcluded"
                            className="text-sm flex min-w-fit text-nowrap mb-0"
                        />
                        <input
                            checked={showExcluded}
                            name="showExcluded"
                            onChange={() => setShowExcluded(!showExcluded)}
                            type="checkbox"
                        />
                    </div>
                </div>
            </div>

            <button
                className="bg-blue-500 text-white p-4 rounded-md disabled:cursor-not-allowed enabled:hover:bg-blue-600 transition-colors"
                disabled={isLoading}
                type="submit"
            >
                Validate
            </button>
        </form>
    );
}
