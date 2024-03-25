import { JetBrains_Mono } from "next/font/google";
import type { ChangeEvent, HTMLProps } from "react";
import { Dispatch, SetStateAction } from "react";
import { Label } from "../Label/Label";

export interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {
    label: string;
    testId: string;

    setValue?: Dispatch<SetStateAction<string>>;
}

const mono = JetBrains_Mono({ subsets: ["latin"] });

export function TextArea({
    label,
    testId,
    name,
    setValue,
    ...props
}: TextAreaProps) {
    name = name ?? label.toLowerCase();
    name = name.replaceAll(" ", "-");

    return (
        <div data-cy={testId} className="flex w-full flex-col text-center">
            <Label text={label} htmlFor={name} />
            <StyledTextArea
                id={name}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setValue?.(e.target.value)
                }
                spellCheck={false}
                {...props}
            />
        </div>
    );
}

interface LoadingProps extends HTMLProps<HTMLTextAreaElement> {
    label?: string;
}

TextArea.Loading = ({ label = "Loading...", ...props }: LoadingProps) => (
    <div
        data-cy="textarea-loading"
        className="flex w-full flex-col text-center"
    >
        <Label htmlFor="loading" text={label} />
        <StyledTextArea
            className="duration-1000 animate-pulse disabled:bg-gray-300"
            disabled
            id="loading"
            {...props}
        />
    </div>
);

interface StyledTextAreaProps extends HTMLProps<HTMLTextAreaElement> {
    className?: string;
}

function StyledTextArea({ className = "", ...props }: StyledTextAreaProps) {
    return (
        <textarea
            {...props}
            className={`${mono.className} w-full h-full break-normal p-2 disabled:text-gray-300 disabled:overflow-hidden disabled:bg-gray-300 dark:disabled:bg-slate-800 disabled:cursor-not-allowed dark:bg-slate-700 rounded-md drop-shadow-lg dark:shadow-2xl resize-none ${className}`}
        />
    );
}
