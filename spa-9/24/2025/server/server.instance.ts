import color from "colorette";
import fastify, {FastifyInstance, FastifyServerOptions} from "fastify";
import {ViteDevServer} from "vite";
import {ModuleLog, Log} from "~/server/log";

const log = ModuleLog(__filename)


// import socketioServer from 'fastify-socket.io'

import {env} from "~~/utils/env";

export default class ServerInstance {
    fastify: FastifyInstance
    vite: ViteDevServer

    constructor(
        public root: string,
        public isProduction: boolean,
    ) {
        this.fastify = fastify({
            logger: {
                transport: {
                    target: './log/http.js',
                },
            }
        })
    }

    async init() {
        if (this.isProduction) {
            this.initStatic()
        } else {
            await this.fastify.register(require('@fastify/express'))
            this.initVite()
        }
        // this.fastify.register(socketioServer, {
        //     pingInterval: 60000
        // })
        this.fastify.ready(err => {
            if (err) throw err
            log.info("ready")
            // initIo(this.fastify['io'])
        })
    }

    private initStatic() {
        const root = `${this.root}/front`
        log.info("initStatic", root)
        this.fastify.register(require('@fastify/static'), {
            root,
            wildcard: false
        })
    }

    private async initVite() {
        log.info("init vite")
        const vite = await (
            await import('vite')
        )
        this.vite = await vite.createServer({
            root: this.root,
            server: {
                hmr: {
                    port: 24000,
                }, middlewareMode: true,
                watch: {
                    usePolling: true,
                    interval: 100
                },
            },
            appType: 'custom'
        })
        // //@ts-ignore
        this.fastify.use(this.vite.middlewares)
    }

    async start(port) {
        const host = env.isProduction ? '0.0.0.0' : 'localhost'
        await this.fastify.listen({port, host})
        log.info(`use ${port} port`)
        log.info(`start at http://${host}:${port}`)
    }
}
