import express, { urlencoded } from "express"
import helmet from "helmet"


const app = express()
app.use(helmet())
app.use(express.json({limit: "20kb"}))
app.use(urlencoded({limit: "20kb", extended: true}))
app.use(express.static("public"))

export default app