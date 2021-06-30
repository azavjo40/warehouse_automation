import React from "react"
import { Navbar } from "./components/_index"
import { BrowserRouter as Router } from "react-router-dom"
import { useRouter } from "./routers/Router"
import "./App.css"

const App: React.FC = () => {
  const isAuthUser: boolean = true
  const router = useRouter({ isAuthUser })
  return (
    <Router>
      <Navbar isAuthUser={isAuthUser} />
      {router}
    </Router>
  )
}

export default App
