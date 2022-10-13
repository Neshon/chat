import React, { FC } from "react"
import { useRoutes } from "react-router"
import { route } from "./route"

export const AppRouter: FC = () => {
  const elements = useRoutes(route)
  return <>{elements}</>
}
