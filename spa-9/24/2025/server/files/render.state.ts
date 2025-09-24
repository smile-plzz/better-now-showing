import {env} from "~/server/utils/env";
import * as fs from "fs";
import {scanPublic} from "~/server/files/scanPublic";

import * as path from "path";

const coreBundles = {
    app: "/app/app.ts",
}

const startBundles = []
const startInline = []

// const makeScript = name => `<script type="module" src="${name}"></script>`
// const makeLink = name => `<link type="text/css" rel="stylesheet" href="${name}">`
// const makeStyle = name => `<style>`

const timestamp = new Date().getTime()
export const renderState = {
    startBundles,
    startInline
}
export const coreState = {
    coreBundles,
    timestamp,
    files: []
}

// export const cacheState = {
//     assets: [],
//     files: {},
//     timestamp
// }

export const initProdSpaFiles = () => {
    const files = scanPublic("art/front")
    const preloader = '/preloader.js'
    const preloaderStyle = '/preloader.css'
    delete files[preloader]
    delete files[preloaderStyle]
    delete coreState['coreBundles']

    coreState.files = Object.keys(files)
    const distPath = path.resolve("art/front")
    const preloaderRaw = fs.readFileSync(distPath + preloader)
    const preloaderStyleRaw = fs.readFileSync(distPath + preloaderStyle)

    startInline.push(`<script type="module">${preloaderRaw}</script>`)
    startInline.push(`<style >${preloaderStyleRaw}</style>`)

    return coreState
}
const initDev = () => {
    startBundles.push(`<script type="module" src="/@vite/client"></script>`)
    startBundles.push(`<script type="module" src="/core/preloader.ts"></script>`)
    // cacheState.files = scanPublic("public")
    // coreState.files = [coreBundles.app, ...Object.keys(cacheState.files)]
    coreState.files = [coreBundles.app]
}

export default function initFrontState() {
    env.isProduction ? initProdSpaFiles() : initDev()
}
// cacheState.files['/'] = cacheState.timestamp

