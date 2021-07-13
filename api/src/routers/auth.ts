import { Router } from "express"
import { register, login, usersWorking } from "../controlles/auth/auth"
const router = Router()
import { validation, chefsCheck } from "../midlleware/index"
router.post("/register", validation, chefsCheck, register)
router.post("/login", validation, login)
router.get("/users/working", usersWorking)
export default router
