import cluster from "cluster";
import {initServerInstance,} from "~/server/server.init";
//import {env} from "~~/utils/env";

import {Log} from "~/server/log";
// import './iot'
import {env} from "~~/utils/env";

if (env.isProduction) {
    if (cluster.isPrimary) {
        masterProcess()
    } else {
        initServerInstance()
    }

    function masterProcess() {
        const clusterCount = 3
        Log.info("cluster count", clusterCount)
        for (let i = 0; i < clusterCount; i++) {
            cluster.fork() //creates new node js processes
        }
        cluster.on("exit", (worker, code, signal) => {
            Log.fatal(`worker ${worker.process.pid} died`)
            cluster.fork() //forks a new process if any process dies
        })
    }
} else {
    initServerInstance()
}
