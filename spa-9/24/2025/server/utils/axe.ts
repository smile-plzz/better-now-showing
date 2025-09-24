import {makeRune} from "@alaq/rune/makeRune";
import crypto from 'node:crypto'
import * as fs from "fs";
import {ModuleLog} from "~~/log";

export const axe = {} as any | {
    crypt(data: any): string
    decrypt(data: string): any
}
const trace = ModuleLog(__filename)

export async function initAxe() {
    const algorithm = 'aes-256-ctr';
    let blade
    const keyFile = "keys.json"
    if (fs.existsSync(keyFile)) {
        const raw = fs.readFileSync(keyFile).toString()
        blade = JSON.parse(raw)
    } else {
        blade = {
            hash: makeRune(512),
            salt: makeRune(512)
        }

        fs.writeFileSync(keyFile, JSON.stringify(blade))
    }

    const key = crypto.scryptSync(blade.hash, blade.salt, 32)


    const iv = Buffer.alloc(16, 0)

    const encode = "base64url"
    axe.crypt = (data) => {
        const cipher = crypto.createCipheriv(algorithm, key, iv)
        const encryptedBuffer = Buffer.concat([
            cipher.update(JSON.stringify(data)),
            cipher.final(),
        ]);
        return encryptedBuffer.toString(encode)
    }

    axe.decrypt = (data) => {
        if (typeof data !== "string") {
            trace.warn("data is not string :", data)
            return false
        }
        try {
            const buf = Buffer.from(data, encode)
            const decipher = crypto.createDecipheriv(algorithm, key, iv)
            const decryptedText = Buffer.concat([
                decipher.update(buf),
                decipher.final(),
            ]);
            return JSON.parse(decryptedText.toString())
        } catch (e) {
            trace.error("fall on data::", data)
            return false
        }
    }
}
