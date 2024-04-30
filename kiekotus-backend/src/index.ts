import express from "express"
import config from "config"
import cors from "cors"
import routes from "./routes"
import cookieParser from "cookie-parser"
import logger from "./lib/utils/logger"
import { deserializeUser } from "./middleware/deserializeUser"
import helmet from "helmet"

const PORT = process.env.PORT
const app = express()

app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:3000,", "80.220.95.201"],
    methods: ["POST", "PUT", "DELETE", "GET"], credentials: true
}))
app.use(express.json())
app.use(deserializeUser)

app.listen(PORT, async () => {
    logger.info(`Listening to port ${PORT}`)
    routes(app)
})

