import express, { Application } from "express"
import { createServer } from "http"
import { connect } from "mongoose"
import { mongoConfig } from "./config-ts/default"
import { routerAuth, socket_io } from "./routers/index"
import bodyParser from "body-parser"
import cors from "cors"
import passport from "passport"
import jwt_passport from "./midlleware/jwt_passport"
const app: Application = express()
const http = createServer(app)
socket_io(http)()
app.use(passport.initialize())
jwt_passport(passport)
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use("/api/auth", routerAuth)

async function start() {
  const PORT: any = process.env.PORT || mongoConfig.port
  try {
    await connect(mongoConfig.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })

    http.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    )
  } catch (e) {
    console.log("Server Error", e.message)
    process.exit(1)
  }
}
start()
