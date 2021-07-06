import { Router } from "express"
import { register, login } from "../controlles/auth/auth"
export const routerAuth = Router()

routerAuth.post("/register", register)
routerAuth.post("/login", login)
