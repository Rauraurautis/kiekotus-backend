import express from "express"
import config from "config"
import cors from "cors"
import routes from "./routes"
import csrf from "csurf"
import cookieParser from "cookie-parser"
import logger from "./lib/utils/logger"
import { deserializeUser } from "./middleware/deserializeUser"

const PORT = config.get("port")
const app = express()

app.use(cookieParser())
app.use(cors({ exposedHeaders: ["x-access-token", "CSRF-Token"], origin: ["http://localhost:3000,", "80.220.95.201"], methods: ["POST", "PUT", "DELETE"], credentials: true }))
app.use(csrf({ cookie: true }))
app.use(express.json())
app.use(deserializeUser)

app.listen(PORT, async () => {
    logger.info(`Listening to port ${PORT}`)
    routes(app)
})

