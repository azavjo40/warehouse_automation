import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { roodreducer } from "./roodReducer"
export const store = createStore(
  roodreducer,
  compose(
    applyMiddleware(
      // добавить свой мидолверий thunk для асинхроний и свой Middleware spamWords
      thunk
    )
    // обединения стор и Redux DevTools
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)
