import React, { useEffect } from "react"
import { Alert, Navbar } from "./components/index"
import { BrowserRouter as Router } from "react-router-dom"
import { useRouter } from "./routers/Router"
import "./App.css"
import { io } from "socket.io-client"
import { useDispatch, useSelector } from "react-redux"
import { autoLogin, refresh_token } from "./redux/auth/authAcsions"
import { getStorage } from "./utils/storage"

const App: React.FC = () => {
  const storage: any = getStorage()
  let socket: any
  if (storage.data) {
    socket = io("http://localhost:5000", {
      auth: {
        token: storage.data.token,
      },
    })
  }

  const isAuthUser = useSelector((state: any) => state.auth.isAuthUser)
  const alert = useSelector((state: any) => state.generals.alert)
  const dispatch = useDispatch()
  useEffect(() => dispatch(autoLogin() as any), [dispatch])

  useEffect(() => dispatch(refresh_token(socket) as any), [dispatch, socket])
  const router = useRouter({ isAuthUser })
  return (
    <Router>
      <Navbar isAuthUser={isAuthUser} />
      {router}
      {alert && <Alert text={alert} />}
    </Router>
  )
}

export default App
