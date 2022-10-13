import { makeAutoObservable } from "mobx"
import { RootStore } from "./root-store"

export class UserStore {
  constructor(root: RootStore, deps: any) {
    makeAutoObservable(this)
  }
}
