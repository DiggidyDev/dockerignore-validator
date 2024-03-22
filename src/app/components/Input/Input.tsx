import { HTMLProps } from "react";

export function Input({ className, ...props }: HTMLProps<HTMLInputElement>) {
    return (
        <input
            className={`w-fill w-[20vw] p-4 bg-transparent ${className}`}
            {...props}
        />
    );
}
