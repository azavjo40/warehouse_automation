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
router.get(
  "/users/working",
  passport.authenticate("jwt", { session: false }),
  usersWorking
)
router.post(
  "/user/change/working",
  permissionsUser,
  passport.authenticate("jwt", { session: false }),
  userBlockWorker
)
router.post(
  "/user/delete/working",
  permissionsUser,
  passport.authenticate("jwt", { session: false }),
  userdeleteWorker
)
export default router
