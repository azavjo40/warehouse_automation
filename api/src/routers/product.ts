import { Router } from "express"
import passport from "passport"
import {
  dispatch,
  receipt,
  histryProducts,
  deleteHistryProducts,
} from "../controlles/product/product"
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
router.post(
  "/product/history",
  passport.authenticate("jwt", { session: false }),
  histryProducts
)
router.post(
  "/delete/product/history",
  passport.authenticate("jwt", { session: false }),
  deleteHistryProducts
)
export default router
