import { useContext } from "react";
import { Label } from "../Label/Label";
import { Options } from "@/app/utils/context";

export function OptionsPanel() {
    const { showIgnored, showOptions, setShowIgnored } = useContext(Options);

    if (!showOptions) {
        return <></>;
    }

    return (
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
                    onChange={() => setShowIgnored(!showIgnored)}
                    type="checkbox"
                />
            </div>
        </div>
    );
}
