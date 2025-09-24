import {FastifyInstance} from "fastify";
import indexPageRenderer from "~/server/pages";
import {coreState} from "~~/files/render.state";
import {ModuleLog} from "~~/log";

const log = ModuleLog(__filename)

export function serverRoutes(f: FastifyInstance) {
    log.info("init routes")
    f.get("/state.json", (req, reply) => {
        reply.code(200)
        reply.header("Content-Type", "application/json;")
        reply.send(JSON.stringify(coreState))
    })
    f.get("*", (req, reply) => {
        reply.code(200)
        reply.header("Content-Type", "text/html;")
        const htmlString = indexPageRenderer({
            title: "-"
        })
        reply.send(htmlString)
    })
}