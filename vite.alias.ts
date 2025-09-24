import {resolve} from "path";

import tsconfig from "./tsconfig.json"





export const alias = {}
Object.keys(tsconfig.compilerOptions.paths).map(key=>{
    const v = tsconfig.compilerOptions.paths[key][0]

    const k = key.replace("/*", "")
    const vv = v
        .replace("/*", "")
        .replace("*", "")
    alias[k] = resolve(__dirname, vv)
})
