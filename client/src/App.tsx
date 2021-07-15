import React, { useEffect } from "react"
import { Alert, Navbar } from "./components/index"
import { BrowserRouter as Router } from "react-router-dom"
import { useRouter } from "./routers/Router"
import "./App.css"
import { useDispatch, useSelector } from "react-redux"
import { autoLogin } from "./redux/auth/authAcsions"

const App: React.FC = () => {
  const isAuthUser = useSelector((state: any) => state.auth.isAuthUser)
  const alert = useSelector((state: any) => state.generals.alert)
  const dispatch = useDispatch()
  useEffect(() => dispatch(autoLogin() as any))
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
