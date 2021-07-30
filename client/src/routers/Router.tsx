import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import {
  Login,
  Register,
  DispatchProduct,
  ReceiptProduct,
  NoPermissionsUser,
  UserWorking,
  HistoryProduct,
} from "../pages/index"
import { getStorage } from "../utils/storage"
import { IPropsRouter } from "../interface/router"
export const useRouter: React.FC<IPropsRouter> = ({ isAuthUser }) => {
  const storage: any = getStorage()
  if (isAuthUser && storage.permissions === "false") {
    return (
      <Switch>
        <Route path={`/${storage.name}`} exact>
          <NoPermissionsUser />
        </Route>
        <Redirect to={`/${storage.name}`} />
      </Switch>
    )
  }

  if (isAuthUser && storage.permissions === "true") {
    return (
      <Switch>
        <Route path='/history/product' exact>
          <HistoryProduct />
        </Route>

        {storage.position !== "storekeeper" && (
          <Route path='/user/working' exact>
            <UserWorking />
          </Route>
        )}

        <Route path='/dispatch/product' exact>
          <DispatchProduct />
        </Route>

        <Route path={`/receipt/product`} exact>
          <ReceiptProduct />
        </Route>
        <Redirect to={`/receipt/product`} />
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
