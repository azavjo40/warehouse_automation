import { User } from "../../models/index"
import jwtDecode from "jwt-decode"

export const passport_io = async (socket: any, next: any) => {
  try {
    const tokenParse: any = jwtDecode(socket.handshake.auth.token)
    const user = await User.findById({ _id: tokenParse.userId })
    if (user) next()
    else next(new Error("unauthorized"))
  } catch (e) {
    console.log(e)
  }
}
