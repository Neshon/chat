import { createContext, useContext } from "react"
import { RootStore } from "./root-store"

export const StoreContext = createContext<RootStore>({} as RootStore)

export const useRootStore = () => useContext(StoreContext)
