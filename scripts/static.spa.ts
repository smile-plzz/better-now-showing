import * as fs from "fs";
import initFrontState, {coreState} from "~~/files/render.state";
import indexPageRenderer from "~~/pages";

initFrontState()
fs.writeFileSync("./art/front/state.json", JSON.stringify(coreState))

const packageJson = JSON.parse(fs.readFileSync("./package.json") as any)
const title = packageJson.name + "_" + packageJson.version
const index = indexPageRenderer({title})

fs.writeFileSync("./art/front/index.html", index)

fs.unlinkSync('./art/front/preloader.js')
fs.unlinkSync('./art/front/preloader.css')