import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ children, className, ...props }: ButtonProps) {
    return (
        <button
            className={`bg-blue-500 text-white p-4 rounded-md disabled:cursor-not-allowed enabled:hover:bg-blue-600 transition-colors ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
