import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import {
  Login,
  Register,
  DispatchProduct,
  ShipmentProduct,
  NoPermissionsUser,
  UserWorking,
  HistoryProduct,
} from "../pages/index"
import { getStorage } from "../utils/storage"
import { IPropsRouter } from "../interface/router"
export const useRouter: React.FC<IPropsRouter> = ({ isAuthUser }) => {
  const storage: any = getStorage()
  if (isAuthUser && storage.data.permissions === "false") {
    return (
      <Switch>
        <Route path={`/${storage.data.name}`} exact>
          <NoPermissionsUser />
        </Route>
        <Redirect to={`/${storage.data.name}`} />
      </Switch>
    )
  }

  if (isAuthUser && storage.data.permissions === "true") {
    return (
      <Switch>
        <Route path='/history/product' exact>
          <HistoryProduct />
        </Route>

        {storage.data.position !== "storekeeper" && (
          <Route path='/user/working' exact>
            <UserWorking />
          </Route>
        )}

        <Route path='/dispatch/product' exact>
          <DispatchProduct />
        </Route>

        <Route path={`/shipment/product`} exact>
          <ShipmentProduct />
        </Route>
        <Redirect to={`/shipment/product`} />
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
