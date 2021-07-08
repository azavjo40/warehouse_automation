import React from "react"
import { Navbar } from "./components/index"
import { BrowserRouter as Router } from "react-router-dom"
import { useRouter } from "./routers/Router"
import "./App.css"

const App: React.FC = () => {
  const isAuthUser: boolean = false
  const router = useRouter({ isAuthUser })
  return (
    <Router>
      <Navbar isAuthUser={isAuthUser} />
      {router}
    </Router>
  )
}

export default App
