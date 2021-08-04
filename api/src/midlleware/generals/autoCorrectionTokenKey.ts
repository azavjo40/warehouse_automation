import { autoCreateCryptoKey } from "../../controlles/generals/generals"
import { Request, Response, NextFunction } from "express"
export const autoCorrectionTokenKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { timeId } = req.body
  if (timeId) autoCreateCryptoKey(req, res)
  else next()
}
