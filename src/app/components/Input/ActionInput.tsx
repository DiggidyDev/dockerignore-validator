import { HTMLProps } from "react";
import { Input } from "./Input";

interface ActionInputProps extends HTMLProps<HTMLInputElement> {
    children: React.ReactNode;
    inputClassName?: string;
}

export function ActionInput({
    children,
    className,
    inputClassName,
    ...props
}: ActionInputProps) {
    return (
        <div
            className={`focus-within:border-[1px] dark:focus-within:border-[#fff] dark:bg-slate-700 bg-white drop-shadow-lg border-black rounded-lg ${className}`}
        >
            <Input {...props} className={inputClassName} />
            {children}
        </div>
    );
}
