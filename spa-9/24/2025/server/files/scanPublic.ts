import * as fs from "fs"
import indexPageRenderer from "../pages";
import {ModuleLog} from "~/server/log";

const path = require("path")
var crypto = require('crypto');


const isImage = {
    png: true,
    jpg: true,

}
const isSkip = {
   "mainfest.json":true
}


const log = ModuleLog(__filename)
export function scanPublic(dir:string, url = "/") {
    if (!fs.existsSync(dir)){
        log.warn("artifacts folder is empty", dir)
        return {}
    }
    const files = fs.readdirSync(dir)
    let urls = {}
    files.forEach(name => {
        if (isSkip[name]){
            return
        }
        const fullPatch = path.join(dir, name)
        const stat = fs.statSync(fullPatch) as fs.Stats
        if (stat.isDirectory()) {
            urls = Object.assign(urls, scanPublic(fullPatch, url + name + "/"))
        } else {
            const ext = name.split(".").pop()
            if (isImage[ext]){
                return
            }
            let hash
            const pageRaw = fs.readFileSync(fullPatch)
            hash = generateChecksum(pageRaw)
            let src = url + name
            urls[src] = hash
        }
    })
    return urls
}

export function generateChecksum(str, algorithm?, encoding?) {
    return crypto
        .createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex')
}
