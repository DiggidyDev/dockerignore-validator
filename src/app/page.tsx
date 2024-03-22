"use client";

import { useContext, useMemo } from "react";
import { ValidationForm } from "./components/Form/ValidationForm";
import { BottomPanel } from "./components/Panel/BottomPanel";
import { OptionsPanel } from "./components/Panel/OptionsPanel";
import { TextArea } from "./components/TextArea/TextArea";
import { processFiles } from "./utils/api";
import { Options, Validation } from "./utils/context";

export default function Home() {
    return (
        <ValidationForm>
            <div className="flex flex-row gap-8 min-h-[70vh] w-full">
                <ValidationInputs />
                <ResultOutput />
                <OptionsPanel />
            </div>
            <BottomPanel />
        </ValidationForm>
    );
}

function ValidationInputs() {
    const { dockerignore, files, isFetchingRepo, setDockerignore, setFiles } =
        useContext(Validation);

    if (isFetchingRepo) {
        return (
            <>
                <TextArea.Loading
                    label="Fetching dockerignore..."
                    value={dockerignore}
                />
                <TextArea.Loading
                    label="Fetching repository..."
                    value={files}
                />
            </>
        );
    }

    return (
        <>
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
        </>
    );
}

function ResultOutput() {
    const {
        files,
        isEvaluating,
        result: validationResult,
    } = useContext(Validation);

    const { showIgnored } = useContext(Options);

    const result = useMemo(
        () => processFiles(files, validationResult, showIgnored),
        [showIgnored, files, validationResult]
    );

    return (
        <>
            {isEvaluating ? (
                <TextArea.Loading label="Matching patterns..." />
            ) : (
                <TextArea
                    testId="result-output"
                    label={showIgnored ? "Ignored Files" : "Files to Copy"}
                    disabled
                    className="disabled:!text-inherit !overflow-auto"
                    value={result}
                />
            )}
        </>
    );
}
