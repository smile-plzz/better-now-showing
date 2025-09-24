const msgMap = {
    "incoming request": "→",
    "request completed": "⇥"
}

const color = require("colorette")

const levels = {
    10: color.white,
    20: color.blue,
    30: color.greenBright,
    40: color.yellow,
    50: color.red,
    60: color.redBright
}

module.exports = opts => require('pino-pretty')({
    ignore: "time,pid,hostname,module",
    messageFormat: (log, messageKey) => {

        switch (log.msg) {
            case "incoming request":
                return `→ ${log.reqId} ${log.req.method} ${log.req.url} `
                break
            case "request completed":
                return `← ${log.reqId} ${log.res.statusCode}`
                break
            default:
                return log[messageKey]
        }
    },
    customPrettifiers: {
        time: t => color.dim(t),
        level: logLevel => levels[logLevel](`HTTP`)
    },
    hideObject: true
})