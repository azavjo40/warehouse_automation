import { Router } from "express"
import passport from "passport"
import { autoCreateCryptoKey } from "../controlles/generals/generals"
import { Request, Response, NextFunction } from "express"
const router = Router()

router.post(
  "/auto/create/key",
  (req: Request, res: Response, next: NextFunction) => {
    const { timeId } = req.body
    if (timeId) autoCreateCryptoKey(req, res)
    else next()
  },
  passport.authenticate("jwt", { session: false }),
  autoCreateCryptoKey
)

export default router
