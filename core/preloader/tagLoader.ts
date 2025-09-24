import {infoText} from "~/core/preloader/logo";
import {createElement} from "@alaq/svg";

let head = [] as {
    target: any,
    promise: Promise<any>
}[]


const addScript = n => {
    const element = createElement("script")
    element.attr
        .async(true)
        .type("module")
        .src(n)
    const {target} = element
    const promise = new Promise(done=> target.onload = e=>done(e))
    head.push({target, promise})
}

const addStyle = n => {

    console.log("add style", n)
    const element = createElement("link")
    element.attr
        .rel("stylesheet")
        .type("text/css")
        .href(n)
    const {target} = element
    const promise = new Promise(done=> target.onload = e=>done(e))
    head.push({target, promise})
}
export async function tagLoader(files: string[]) {
    files.reverse()
    files.forEach(f => {
        const ext = f.split(".").pop()
        const dir = f.split("/")[1]
        switch (dir) {
            case "app":
                addScript(f)
                break
            case "assets":
                ext === 'js' ? addScript(f) : addStyle(f)
                break
            default:
                if (ext === 'css' && (f !== '/fonts.css')) {
                    addStyle(f)
                }

        }
    })
    const promises = []
    head.forEach(({target, promise}) => {
        promises.push(promise)
        document.head.appendChild(target)
    })

    infoText("загрузка ресурсов")

    await Promise.all(promises)
    await document.fonts.ready
}

window.addEventListener("READY", ()=>{
    if (window['fontsReady']) {
        window['hideLogo']()
    }
    window.addEventListener("FONTS_READY", ()=>{
        window['hideLogo']()
    })
})
export function fontLoader(custom) {
    window["WebFontConfig"] = {
        custom,
        active() {
            console.log("fontsReady")
            infoText("активация")
            window['fontsReady'] = true
            window.dispatchEvent(new Event("FONTS_READY"))
        },
    }
    let wf = window.document.createElement('script'), s = window.document.scripts[0];
    wf.src = '/webfont.js';
    wf.async = true;
    s.parentNode.insertBefore(wf, s);
}

