import { Router } from "express"
import passport from "passport"
import {
  register,
  login,
  usersWorking,
  userBlockWorker,
  userdeleteWorker,
} from "../controlles/auth/auth"
import { permissionsUser } from "../midlleware/auth/permissionsUser"
const router = Router()
import { validation, chefsCheck } from "../midlleware/index"
router.post("/register", validation, chefsCheck, register)
router.post("/login", validation, login)
router.post(
  "/users/working",
  passport.authenticate("jwt", { session: false }),
  usersWorking
)
router.post(
  "/user/change/working",
  passport.authenticate("jwt", { session: false }),
  permissionsUser,
  userBlockWorker
)
router.post(
  "/user/delete/working",
  passport.authenticate("jwt", { session: false }),
  permissionsUser,
  userdeleteWorker
)
export default router
