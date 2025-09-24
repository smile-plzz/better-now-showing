// @ts-nocheck
// @ts-expect-error

import pino from "pino";
import * as path from "path";
import * as color from "colorette";
import pretty from 'pino-pretty'
import {env} from "~/server/utils/env";


const logInstance = pino({
        transport: {
            target: './main.js'
        }
    }
)


type Levels = "fatal" | "error" | "warn" | "info" | "debug" | "trace";
type LogCall = {
    (...info: any[]): void
}
type LevelCalls = {
    [K in Levels]: LogCall
}
type ProxyLoger = LevelCalls & LogCall

const parseMultiline = (ll) => {
    if (ll.length > 1) {
        let a = ll.map(l => {
            switch (typeof l) {
                case "function":
                    return "Func:" + `(${l.name || "anonymous"})`
                case "string":
                    return l
                default:
                    return JSON.stringify(l)
            }
        })
        return a.join(" ")
    } else {
        return ll[0]
    }
}

const newProxy = i => new Proxy(i as Function, {
    apply(target: any, thisArg: any, argArray: any[]): any {
        target.l.info(parseMultiline(argArray))
    },
    get(target: any, p: string | symbol, receiver: any): any {
        return (...l) => target.l[p](parseMultiline(l))
    }
}) as ProxyLoger

function wrapLog(module, level) {
    function fn() {
    }

    const child = logInstance.child({module}, {level})
    fn.l = child
    return newProxy(fn)
}

export const Log = wrapLog(false, env.LOG_LEVEL)


export function ModuleLog(filename) {
    const fname = path.basename(filename)
    const module = fname.replace(path.extname(fname), "")
    return wrapLog(module, env.LOG_LEVEL)
}