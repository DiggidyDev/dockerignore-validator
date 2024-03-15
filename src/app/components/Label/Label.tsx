export interface LabelProps {
    htmlFor: string;
    text: string;

    className?: string;
}

export function Label({ className = "", text, htmlFor }: LabelProps) {
    return (
        <label
            htmlFor={htmlFor}
            className={`text-2xl font-bold mb-4 ${className}`}
        >
            {text}
        </label>
    );
}
