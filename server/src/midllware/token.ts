import { sign } from "jsonwebtoken"
import { mongoConfig } from "../config-ts/default"

export const token = (userId: string) => {
  return () => {
    return sign({ userId: userId }, mongoConfig.jwtSecret, {
      expiresIn: "1h",
    })
  }
}
