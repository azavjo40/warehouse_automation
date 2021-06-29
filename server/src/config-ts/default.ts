interface PortMongoUrl {
  port: number
  jwtSecret: string
  mongoUri: string
  baseUrl: string
}
export const mongoConfig: PortMongoUrl = {
  port: 5000,
  jwtSecret: "azamshokh www",
  mongoUri:
    "mongodb+srv://azavjon40:Brat1221@cluster0.tdgcv.mongodb.net/EastKebab?retryWrites=true&w=majority",
  baseUrl: "http://localhost:5000",
}
