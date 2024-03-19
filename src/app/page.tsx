"use client";

import { useState } from "react";
import { Button } from "./components/Button/Button";
import { Label } from "./components/Label/Label";
import { TextArea } from "./components/TextArea/TextArea";

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
    // MAIN STATE
    const [dockerignore, setDockerignore] = useState("");
    const [files, setFiles] = useState("");
    const [result, setResult] = useState<boolean[]>([]);

    // CONTROL STATE
    const [repoUrl, setRepoUrl] = useState(
        process.env.NEXT_PUBLIC_SAMPLE_GITHUB_REPO!
    );
    const [showOptions, setShowOptions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // OPTIONS
    const [showIgnored, setShowIgnored] = useState(true);

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
            className="flex gap-8 items-center justify-center p-8 rounded-lg min-w-full"
        >
            <div className="flex flex-col items-center gap-8 w-full">
                <div className="flex flex-row gap-8 min-h-[70vh] w-full">
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
                            label={
                                showIgnored ? "Ignored Files" : "Files to Copy"
                            }
                            disabled
                            value={processFiles(files, result, showIgnored)}
                        />
                    )}
                    {showOptions && (
                        <div
                            data-cy="options-container"
                            className="flex flex-col items-center gap-2"
                        >
                            <h2 className="font-bold text-2xl">Options</h2>
                            <div
                                data-cy="options"
                                className="flex h-full flex-row-reverse items-center gap-2"
                            >
                                <Label
                                    text="Show ignored files?"
                                    htmlFor="showIgnored"
                                    className="text-sm flex min-w-fit text-nowrap !mb-0"
                                />
                                <input
                                    checked={showIgnored}
                                    name="showIgnored"
                                    onChange={() =>
                                        setShowIgnored(!showIgnored)
                                    }
                                    type="checkbox"
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex gap-8 w-fill items-center">
                    <div className="bg-slate-700 rounded-lg">
                        <input
                            className="w-fill w-[20vw] p-4 bg-transparent"
                            onChange={(e) => setRepoUrl(e.target.value)}
                            type="url"
                            value={process.env.NEXT_PUBLIC_SAMPLE_GITHUB_REPO}
                        />
                        <Button
                            className="!bg-[#333] !p-3 mr-1 enabled:hover:!bg-[#2b2b2b]"
                            data-cy="import-button"
                            disabled={isLoading}
                            onClick={() => {}}
                            type="button"
                        >
                            Import from GitHub
                        </Button>
                    </div>
                    <Button
                        data-cy="toggle-options"
                        className="bg-yellow-500 enabled:hover:bg-yellow-600"
                        onClick={() => setShowOptions(!showOptions)}
                        type="button"
                    >
                        {showOptions ? "Hide" : "Show"} Options
                    </Button>
                    <Button
                        data-cy="validate-button"
                        disabled={isLoading}
                        type="submit"
                    >
                        Validate
                    </Button>
                </div>
            </div>
        </form>
    );
}
