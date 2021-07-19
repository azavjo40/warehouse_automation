import { Server, Socket } from "socket.io"
import { refresh_token } from "../../controlles/auth/socket_io/refresh_token"

export const socket_io = (http: any) => {
  const io = new Server(http, {
    cors: {
      origins: ["http://localhost:5000"],
    } as any,
  })
  return async () => {
    try {
      console.log("Socket is connection")
      io.on("connect", async (socket: Socket) => {
        await refresh_token(socket, io)
      })
    } catch (e) {
      console.log(e)
    }
  }
}
