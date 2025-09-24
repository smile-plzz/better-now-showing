const color = require("colorette");

const starTime = Date.now()
module.exports = opts => require('pino-pretty')({
    ignore: "pid,hostname",
    hideObject: true,
    customPrettifiers: {
        time: timestamp => -1 * (starTime - timestamp) //((starTime - timestamp) - 10000000000),
    },
    messageFormat: (log, messageKey, ...a) => {

        let s = ""
        if (log.module) {
            s = `${color.dim(log.module)} `
        }
        if (log.msg) {
            s += log.msg
        }
        return s
    },
})