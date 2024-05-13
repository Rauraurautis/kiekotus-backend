"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const pino_1 = __importDefault(require("pino"));
const pino_2 = __importDefault(require("pino"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transport = pino_1.default.transport({
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
});
const log = (0, pino_2.default)({
    base: {
        pid: false
    },
    mixin: (_context, level) => {
        return { test: pino_2.default.levels.labels[level] };
    },
    timestamp: () => `,"time":"${(0, dayjs_1.default)().format()}"`
}, transport);
exports.default = log;
