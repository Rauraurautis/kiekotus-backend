import dayjs from "dayjs";
import pino from "pino";
import logger from "pino"
import dotenv from "dotenv"
dotenv.config()

const transport = pino.transport({
    targets: [
        {
            target: process.env.NODE_ENV === "development" ? "pino-pretty" : "pino/file",
            options: process.env.NODE_ENV === "development" ? { colorize: true } : { destination: `./log/logs.txt` },
            level: "error"
        },
        {
            target: process.env.NODE_ENV === "development" ? "pino-pretty" : "pino/file",
            options: process.env.NODE_ENV === "development" ? { colorize: true } : { destination: `./log/logs.txt` },
            level: "info"
        }
    ]
})

const log = logger({
    base: {
        pid: false
    },
    mixin: (_context, level) => {

        return { test: logger.levels.labels[level] }
    },

    timestamp: () => `,"time":"${dayjs().format()}"`
}, transport)

export default log