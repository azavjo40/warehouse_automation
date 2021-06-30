import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { Login, Register, Product, Home } from "../pages/_index"
interface Props {
  isAuthUser: boolean
}
export const useRouter: React.FC<Props> = ({ isAuthUser }) => {
  return (
    <Switch>
      {isAuthUser ? (
        <>
          <Route path='/product' exact>
            <Product />
          </Route>
          <Route path='/home' exact>
            <Home />
          </Route>
          <Redirect to='/home' />
        </>
      ) : (
        <>
        <Route path='/register' exact>
            <Register />
          </Route>

          <Route path='/login' exact>
            <Login />
          </Route>

          <Redirect to='/register' />
        </>
      )}
    </Switch>
  )
}
