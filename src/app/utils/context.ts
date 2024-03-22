/* istanbul ignore file */
import { createContext } from "react";
import type { OptionsContext, ValidationContext } from "./interfaces";

export const Options = createContext<OptionsContext>(null!);

export const Validation = createContext<ValidationContext>(null!);
