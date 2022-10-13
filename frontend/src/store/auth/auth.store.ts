import { makeAutoObservable } from "mobx"
import { RootStore } from "../root-store"
import { BrowserHistory } from "history"

export class AuthStore {
  private history: BrowserHistory

  constructor(root: RootStore, { history }: any) {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      }
    )

    this.history = history
  }

  public *signIn(body: any): any {
    const res = yield fetch("http://127.0.0.1:8000/api/v1/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (res.ok) {
      //ToDo
      // - add redirects on OTP screen
      this.history.push("/")
    }
  }
}
