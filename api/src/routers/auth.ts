import { Router } from "express"
import { register, login } from "../controlles/auth/auth"
const router = Router()
import { validation } from "../midlleware/auth/validation"
router.post("/register", validation, register)
router.post("/login", validation, login)
export default router
