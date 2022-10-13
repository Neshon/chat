import { AuthStore } from "./auth"
import { UserStore } from "./user-store"
import { history } from "../core/components/routes/history"

export class RootStore {
  public auth: AuthStore
  public user: UserStore

  constructor(deps: any) {
    this.auth = new AuthStore(this, deps)
    this.user = new UserStore(this, deps)
  }
}

export const root = new RootStore({
  history,
})
