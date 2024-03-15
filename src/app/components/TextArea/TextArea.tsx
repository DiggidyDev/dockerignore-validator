import type { ChangeEvent, HTMLProps } from "react";
import { Dispatch, SetStateAction } from "react";
import { Label } from "../Label/Label";

interface TextAreaProps {
    label: string;

    disabled?: boolean;
    name?: string;
    required?: boolean;
    setValue?: Dispatch<SetStateAction<string>>;
    value?: string;
}

export function TextArea({
    label,
    disabled = false,
    name,
    required = false,
    setValue,
    value,
}: TextAreaProps) {
    name = name ?? label.toLowerCase();

    return (
        <div className="flex w-full flex-col text-center">
            <Label text={label} htmlFor={name} />
            <StyledTextArea
                disabled={disabled}
                name={name}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setValue?.(e.target.value)
                }
                required={required}
                spellCheck={false}
                value={value}
            />
        </div>
    );
}

interface LoadingProps {
    label?: string;
}

TextArea.Loading = ({ label = "Loading..." }: LoadingProps) => (
    <div className="flex w-full flex-col text-center">
        <Label htmlFor="loading" text={label} />
        <StyledTextArea
            className="duration-1000 animate-pulse disabled:bg-gray-300"
            disabled
            name="loading"
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
            className={`w-full h-full p-2 disabled:bg-gray-300 dark:disabled:bg-slate-800 disabled:cursor-not-allowed dark:bg-slate-700 rounded-md drop-shadow-lg dark:shadow-2xl resize-none ${className}`}
        />
    );
}
