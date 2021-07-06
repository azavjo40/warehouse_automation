import express, { Application, Request, Response, NextFunction } from "express"
import { createServer } from "http"
import { connect } from "mongoose"
import { mongoConfig } from "./config-ts/default"
import { routerAuth } from "./routers/_index"
const app: Application = express()
const http = createServer(app)

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
