import { getGithubRepo } from "@/app/utils/api";
import { Options, Validation } from "@/app/utils/context";
import { ChangeEvent, useContext, useState } from "react";
import { Button } from "../Button/Button";
import { ActionInput } from "../Input/ActionInput";

export function BottomPanel() {
    const [error, setError] = useState<string | undefined>();
    const [repoUrl, setRepoUrl] = useState("");

    const { isEvaluating, setDockerignore, setFiles, setIsFetchingRepo } =
        useContext(Validation);
    const { showOptions, setShowOptions } = useContext(Options);

    const fetchRepo = async () => {
        setError(undefined);
        setIsFetchingRepo(true);

        try {
            const { dockerignore, files } = await getGithubRepo(repoUrl);

            setFiles(files.join("\n"));
            setDockerignore(dockerignore.join("\n"));
        } catch (e) {
            setError((e as Error).message);
        } finally {
            setIsFetchingRepo(false);
        }
    };

    return (
        <div className="flex gap-8 w-fill items-center">
            <ActionInput
                className={`${error ? "border-2 border-red-500 relative" : ""}`}
                inputClassName="outline-none"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setRepoUrl(e.target.value)
                }
                placeholder={
                    process.env.NEXT_PUBLIC_SAMPLE_GITHUB_REPO ??
                    "github.com/username/repo/tree/branch"
                }
            >
                {error && (
                    <p
                        className="absolute top-[8vh] text-red-500 text-sm"
                        data-cy="error"
                    >
                        Error: {error}
                    </p>
                )}
                <Button
                    className="!bg-[#333] focus:!bg-[#555] dark:disabled:!bg-[#2b2b2b] disabled:!bg-[#555] disabled:text-gray-300 !p-3 mr-1 dark:enabled:hover:!bg-[#2b2b2b] enabled:hover:!bg-[#4c4c4c]"
                    data-cy="import-button"
                    disabled={isEvaluating}
                    onClick={fetchRepo}
                    type="button"
                >
                    Import from GitHub
                </Button>
            </ActionInput>
            <Button
                data-cy="toggle-options"
                className="bg-yellow-500 min-w-[9rem] enabled:hover:bg-yellow-600"
                onClick={() => setShowOptions(!showOptions)}
                type="button"
            >
                {showOptions ? "Hide" : "Show"} Options
            </Button>
            <Button
                data-cy="validate-button"
                disabled={isEvaluating}
                type="submit"
            >
                Validate
            </Button>
        </div>
    );
}
