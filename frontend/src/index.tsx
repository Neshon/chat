import React, { StrictMode } from "react"
import ReactDOM from "react-dom"
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom"
import { AppRouter, history } from "./core"
import { RecoilRoot } from "recoil"
import { GlobalStyle } from "./create-global-style"
import { StoreContext, root } from "./store"
import "normalize.css"

ReactDOM.render(
  <StrictMode>
    <GlobalStyle />
    <HistoryRouter history={history}>
      <RecoilRoot>
        <StoreContext.Provider value={root}>
          <AppRouter />
        </StoreContext.Provider>
      </RecoilRoot>
    </HistoryRouter>
  </StrictMode>,
  document.getElementById("root")
)
