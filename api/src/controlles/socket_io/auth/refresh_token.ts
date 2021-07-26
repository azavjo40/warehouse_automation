import { User } from "../../../models/index"
import { token } from "../../../utils/token"
import { IAnswerServer } from "../../../interface/auth"
export const refresh_token = async (socket: any, io: any) => {
  try {
    socket.on("refresh/token", async ({ userId }: any) => {
      const user: any = await User.findOne({ _id: userId })
      if (userId && user) {
        const jwtToken: string = token(user._id)
        const data: IAnswerServer = {
          date: user.date,
          email: user.email,
          last_name: user.last_name,
          name: user.name,
          permissions: user.permissions,
          position: user.position,
          token: `Bearer ${jwtToken}`,
          userId: user._id,
        }
        io.emit(`${user._id}`, { data })
      }
    })
  } catch (e) {
    console.log(e)
  }
}
