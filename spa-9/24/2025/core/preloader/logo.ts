
import {createCircle, createElement, createSVG} from "@alaq/svg";
import Point from "@alaq/svg/Point";

const logo = createSVG("logo", "100%", "100%")
logo.attr.class("intro-logo")
    .viewBox("0 0 500 500")
const defs = logo.addChild.defs

const center = new Point(250, 250)
const r = 57

const all = logo.addChild.g
all.attr.class("all")
const g = all.addChild.g
const v = all.addChild.g
const z = all.addChild.g

v.attr.class('second-part')
g.attr.class("one-part")
// z.attr.filter("url(#neon);")


let aux = [
    ["l1", 160, "7%", "130, 900", 0.2],
    ["l1", 165, "3%", "300, 30", 0.2],
    ["l3", 170, "0.3%", "8", 0.3],
]

const toRemove = []

function aura(col) {

    const makeAura = ([className, size, w, dash, opacity, offset]) => {
        const l1 = createCircle(z, size, 'white')
        l1.attr.opacity(opacity / 3)
            .class(className)
            ["stroke-width"](w)
            ["stroke-dasharray"](dash)
            ["stroke-dashoffset"](Math.random() * 1000)
            ["stroke-linecap"]("butt")
        l1.cc.setCenter(center)
        toRemove.push(l1.target)
    }

    let i = col
    while (i--) {
        aux.push(["l1", Math.random() * 100 + 120, `${Math.random() * 5}`, `${Math.random() * 500} ${Math.random() * 500} ${Math.random() * 900}`, Math.random() - 0.3])
    }
    i = col
    while (i--) {
        aux.push(["l1", Math.random() * 100 + 120, `${Math.random() * 15}`, `${Math.random() * 500} ${Math.random() * 900} ${Math.random() * 900}`, Math.random() - 0.2])
    }


    i = Math.round(col / 3)
    while (i--) {
        aux.push(["l2", Math.random() * 50 + 120, `${Math.random() * 15}`, `${Math.random() * 500} ${Math.random() * 500} ${Math.random() * 900}`, Math.random() - 0.7])
    }

    aux.push(["l3", 220, "0.3%", "8", Math.random() - 0.3],)
    aux.push(["l4", 120, "0.3%", `${5 + Math.random() * 15}`, Math.random() - 0.1],)
//@ts-ignore
    aux.map(makeAura)
    aux.length = 0
}


let ready = false

const buildText = createElement("div")
const logoImg = createElement("img")

logoImg.attr.src("/logo/logo.svg")
logoImg.attr.class("svg-logo")

// logoText.attr.class("logo-text")
// logoText.target.innerHTML = "20.35"

function init() {
    if (ready) {
        return
    }
    ready = true

    aura(3)
    window['mainLogo'] = logo.target.innerHTML


    buildText.attr.class("preloader-text")
    buildText.target.innerHTML = "сборка: __BUILD__"
    window['infoText'] = s => {
        aura(3)
        buildText.target.innerHTML = s
    }




    const root = document.getElementById("preloader")
    root.appendChild(buildText.target)
    root.appendChild(logo.target)
    root.appendChild(logoImg.target)
}

window.onload = init
window.addEventListener('load', init, false);
window['hideLogo'] = () => {

    const root = document.getElementById("preloader")

    toRemove.forEach(r => {
        // console.log(r)
        z.target.removeChild(r)
        aux = []
    })
    logoImg.attr.class("logo-text out")
    // document.getElementById("root")
    aura(12)
    logo.attr.class("intro-logo out")
    buildText.target.parentNode.removeChild(buildText.target)
    setTimeout(() => {
        root.parentNode.removeChild(root)
    }, 300)
}

window['infoLastText'] = ''
export const infoText = text => {
    window['infoText'] && window['infoText'](text)
    window['infoLastText'] = text
}
