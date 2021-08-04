import { Router } from "express"
import passport from "passport"
import { autoCreateCryptoKey } from "../controlles/generals/generals"
import { autoCorrectionTokenKey } from "../midlleware/generals/autoCorrectionTokenKey"
const router = Router()

router.post(
  "/auto/create/key",
  autoCorrectionTokenKey,
  passport.authenticate("jwt", { session: false }),
  autoCreateCryptoKey
)

export default router
