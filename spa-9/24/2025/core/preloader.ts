import './preloader.scss'
import './preloader/logo'
import {infoText} from "~/core/preloader/logo";
import {fontLoader, tagLoader} from "~/core/preloader/tagLoader";


window.addEventListener('load', initSW);

async function initSW() {
    const coreStatePath = "/state.json"
    let stateRequest = await fetch(coreStatePath)
    let state

    if (stateRequest?.ok) {
        state = await stateRequest.json()
    }
    infoText("инициализация")
    tagLoader(state.files)
    fontLoader({
        families: ['Golos Text', 'Golos UI VF', 'Material Icons'],
        urls: ['/fonts.css'],
    },)
}

