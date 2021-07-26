import { Router } from "express"
import passport from "passport"
import { dispatch, receipt } from "../controlles/product/product"
const router = Router()

router.post(
  "/product/dispatch",
  passport.authenticate("jwt", { session: false }),
  dispatch
)
router.post(
  "/product/receipt",
  passport.authenticate("jwt", { session: false }),
  receipt
)
export default router
