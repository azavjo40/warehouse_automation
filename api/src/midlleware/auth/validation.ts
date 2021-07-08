import { Request, Response, NextFunction } from "express"
export const validation = (req: Request, res: Response, next: NextFunction) => {
  const { name, last_name, email, password, position } = req.body
  const pass: [] = password.split("")
  const url: string = req.url
  try {
    if (url === "/register") {
      if (!name) {
        res.json({ message: "Fill out the forms name" })
      } else if (!last_name) {
        res.json({ message: "Fill out the forms last_name" })
      } else if (!email) {
        res.json({ message: "Fill out the forms email" })
      } else if (pass.length < 6) {
        res.json({ message: "Fill out the forms password" })
      } else if (!position) {
        res.json({ message: "Fill out the forms position" })
      } else {
        next()
      }
    }
    if (url === "/login") {
      if (!email) {
        res.json({ message: "Fill out the forms email" })
      } else if (pass.length < 6) {
        res.json({ message: "Fill out the forms password" })
      } else {
        next()
      }
    }
  } catch (e) {
    console.log(e)
  }
}
