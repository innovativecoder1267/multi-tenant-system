import {z} from "zod";


export const usernamevalidation=z
.string()
.min(3,"Minimum three letters required")
.max(10,"Max limit exceded")
.regex(/^[a-zA-Z][a-zA-Z0-9_]*$/, {
    message: "Invalid username",
});