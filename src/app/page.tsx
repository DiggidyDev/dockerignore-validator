"use client";

import { useState } from "react";
import { TextArea } from "./components/TextArea/TextArea";
import { Label } from "./components/Label/Label";

const processFiles = (
    files: string,
    result: boolean[],
    showIgnored: boolean
) => {
    const filepaths = files.split("\n");

    const isIgnored = (fp: string, i: number) =>
        showIgnored ? result[i] : !result[i];

    return filepaths.filter(isIgnored).join("\n");
};

export default function Home() {
    const [dockerignore, setDockerignore] = useState("");
    const [files, setFiles] = useState("");

    const [result, setResult] = useState<boolean[]>([]);
    const [showIgnored, setShowIgnored] = useState(true);

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
                    testId="dockerignore-input"
                    name="dockerignore"
                    setValue={setDockerignore}
                    value={dockerignore}
                    required
                />

                <TextArea
                    label="Files"
                    testId="files-input"
                    setValue={setFiles}
                    value={files}
                    required
                />

                {isLoading ? (
                    <TextArea.Loading label="Matching patterns..." />
                ) : (
                    <TextArea
                        testId="result-output"
                        label={showIgnored ? "Ignored Files" : "Files to Copy"}
                        disabled
                        value={processFiles(files, result, showIgnored)}
                    />
                )}
                <div
                    data-cy="options-container"
                    className="flex flex-row-reverse items-center gap-2"
                >
                    <div
                        data-cy="options"
                        className="flex flex-row-reverse items-center gap-2"
                    >
                        <Label
                            text="Show ignored files?"
                            htmlFor="showIgnored"
                            className="text-sm flex min-w-fit text-nowrap !mb-0"
                        />
                        <input
                            checked={showIgnored}
                            name="showIgnored"
                            onChange={() => setShowIgnored(!showIgnored)}
                            type="checkbox"
                        />
                    </div>
                </div>
            </div>

            <button
                data-cy="validate-button"
                className="bg-blue-500 text-white p-4 rounded-md disabled:cursor-not-allowed enabled:hover:bg-blue-600 transition-colors"
                disabled={isLoading}
                type="submit"
            >
                Validate
            </button>
        </form>
    );
}
