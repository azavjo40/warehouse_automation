import User from "../../../models/auth"
import { token } from "../../../utils/token"
export const refresh_token = async (socket: any, io: any) => {
  try {
    socket.on("user/id", async ({ userId }: any) => {
      const user: any = await User.findOne({ _id: userId })
      if (userId && user) {
        const jwtToken: string = token(user._id)
        const data = {
          date: user.date,
          email: user.email,
          last_name: user.last_name,
          name: user.name,
          permissions: user.permissions,
          position: user.position,
          token: `Bearer ${jwtToken}`,
          userId: user._id,
        }
        io.emit("refresh/token", { data })
      }
    })
  } catch (e) {
    console.log(e)
  }
}