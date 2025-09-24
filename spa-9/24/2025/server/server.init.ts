import {ModuleLog} from "~/server/log";
import initFrontState from "~~/files/render.state";
import {serverRoutes} from "~~/server.routes";
import {initAxe} from "~~/utils/axe";
import {env} from "~~/utils/env";
import ServerInstance from "./server.instance";

const path = require("path");
const log = ModuleLog(__dirname)

export async function initServerInstance() {
    await initAxe()
    const root = path.resolve(`${__dirname}/..`)
    log.info("cwd:", root)
    initFrontState()
    const instance = new ServerInstance(root, env.isProduction)
    await instance.init()
    serverRoutes(instance.fastify)
    await instance.start(process.env.PORT)
    return instance.fastify
}