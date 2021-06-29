import express, { Application, Request, Response } from "express"
import { createServer } from "http"
import mongoose from "mongoose"
import { mongoConfig } from "./config-ts/default"
const app: Application = express()
const http = createServer(app)
//  --save-dev
const PORT = process.env.PORT || mongoConfig.port
async function start() {
  try {
    await mongoose.connect(mongoConfig.mongoUri, {
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
