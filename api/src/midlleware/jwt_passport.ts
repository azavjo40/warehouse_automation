import { mongoConfig } from "../config-ts/default"
import { User } from "../models/index"
import { Strategy, ExtractJwt } from "passport-jwt"

export default (passport: any) => {
  const option = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: mongoConfig.jwtSecret,
  }
  passport.use(
    new Strategy(option, async (payload: any, done: any) => {
      try {
        const user = await User.findById(payload.userId).select("email id")
        if (user) done(null, user)
        else done(null, false)
      } catch (e) {
        console.log(e)
      }
    })
  )
}
