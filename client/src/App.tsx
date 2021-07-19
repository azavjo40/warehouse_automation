import React, { useEffect } from "react"
import { Alert, Navbar } from "./components/index"
import { BrowserRouter as Router } from "react-router-dom"
import { useRouter } from "./routers/Router"
import "./App.css"
import { io } from "socket.io-client"
import { useDispatch, useSelector } from "react-redux"
import { autoLogin, refresh_token } from "./redux/auth/authAcsions"
const App: React.FC = () => {
  const socket = io("http://localhost:5000", {
    reconnectionDelayMax: 10000,
    auth: {
      token: "123",
    },
  })
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
