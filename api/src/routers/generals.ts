import { Router } from "express"
import passport from "passport"
import { autoCreateKey } from "../controlles/generals/generals"
const router = Router()

router.post(
  "/auto/create/key",
  passport.authenticate("jwt", { session: false }),
  autoCreateKey
)

export default router
