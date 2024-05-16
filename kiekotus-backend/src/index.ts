import express from "express"
import config from "config"
import cors from "cors"
import routes from "./routes"
import cookieParser from "cookie-parser"
import logger from "./lib/utils/logger"
import { deserializeUser } from "./middleware/deserializeUser"

const PORT = process.env.PORT
const app = express()

app.use(cookieParser())
app.use(cors({
    origin: '*', // Allow requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    credentials: true // Allow credentials
}));
app.use(express.json())
app.use(deserializeUser)

app.listen(PORT, async () => {
    logger.info(`Listening to port ${PORT}`)
    routes(app)
})

