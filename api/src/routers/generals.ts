import { Router } from "express"
import passport from "passport"
import { autoCreateCryptoKey } from "../controlles/generals/generals"
const router = Router()

router.post(
  "/auto/create/key",
  passport.authenticate("jwt", { session: false }),
  autoCreateCryptoKey
)

export default router
