"use client";

import { Options } from "@/app/utils/context";
import { HTMLProps, useContext, useState } from "react";
import { FaCog } from "react-icons/fa";
import { Label } from "../Label/Label";

export function OptionsPanel() {
    const [className, setClassName] = useState<string>("");

    const { showIgnored, showOptions, setShowIgnored, setShowOptions } =
        useContext(Options);

    const onClick = () => {
        setShowOptions(!showOptions);
        setClassName(
            showOptions ? "animate-spin-focus" : "animate-spin-reverse-focus"
        );

        setTimeout(() => {
            setClassName("");
        }, 750);
    };

    if (!showOptions) {
        return <OptionsIcon className={className} onClick={onClick} />;
    }

    return (
        <>
            <OptionsIcon className={className} onClick={onClick} />
            <div
                data-cy="options-container"
                className="flex flex-col items-center gap-2 relative"
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
        </>
    );
}

interface OptionsIconProps extends HTMLProps<SVGElement> {
    className?: string;
    onClick: () => void;
}

function OptionsIcon({ className = "", onClick, ...props }: OptionsIconProps) {
    return (
        <div className="absolute top-6 right-6 hover:animate-enbiggen">
            <FaCog
                data-cy="toggle-options"
                title="Options"
                className={`z-[99] min-w-8 min-h-8 focus:border-none !outline-none cursor-pointer ${className}`}
                tabIndex={0}
                {...(props as HTMLProps<SVGElement>)}
                onClick={onClick}
                onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") && onClick()
                }
            />
        </div>
    );
}
