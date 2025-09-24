import * as color from "colorette";
import dotenv from "dotenv";
// import {FileLog} from "../log/index";
// const log = FileLog(__filename)


// console.log(process.argv[2])
function loadDotEnv() {
    const isProduction = process.env.NODE_ENV === 'production' || process.argv[2] === "--prod"
    const envName = isProduction ? "master" : 'dev'
    const dotEnv = dotenv.config({path: '.env.' + envName})
    let helloMsx = isProduction ? color.green("production") : color.blue("development")
    console.log(color.dim("running in"), color.bold(helloMsx), color.dim("mode"))
    const envObj = Object.assign({isProduction}, dotEnv.parsed)
    return new Proxy(envObj, {
            get(eo: any, key: string) {
                const v = eo[key]
                if (v) return v
                return process.env[key]
            }
        }
    )
}

export const env = loadDotEnv()