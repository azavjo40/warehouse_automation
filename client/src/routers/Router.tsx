import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { Login, Register, Product, Home, PermissionsUser } from "../pages/index"
import { getStorage } from "../utils/index"
import { PropsRouter } from "./interface"
const storage: any = getStorage()

export const useRouter: React.FC<PropsRouter> = ({ isAuthUser }) => {
  if (isAuthUser) {
    return (
      <Switch>
        {storage.user.permissions === "false" ? (
          <>
            <Route path='/' exact>
              <PermissionsUser />
            </Route>
            <Redirect to='/' />
          </>
        ) : (
          <>
            <Route path='/product' exact>
              <Product />
            </Route>
            <Route path='/home' exact>
              <Home />
            </Route>
            <Redirect to='/home' />
          </>
        )}
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route path='/register' exact>
          <Register />
        </Route>

        <Route path='/login' exact>
          <Login />
        </Route>

        <Redirect to='/register' />
      </Switch>
    )
  }
}
