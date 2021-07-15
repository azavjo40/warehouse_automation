import { mongoConfig } from "../config-ts/default"
const mongoose = require("mongoose")
const User = mongoose.model("User")
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: mongoConfig.mongoUri,
}

export default (passport: any) => {
  passport.use(
    new JwtStrategy(option, async (payload: any, done: any) => {
      try {
        console.log(payload)
        const user = await User.findById(payload.userId).select("email id")
        console.log(user)
        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      } catch (e) {
        console.log(e)
      }
    })
  )
}
