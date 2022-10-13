import React, { FC } from "react"
import { Outlet } from "react-router"
import { NavBar } from "../../core"
import { RoomsList } from "./components"

export const Rooms: FC = () => {
  return (
    <>
      <NavBar
        deep={false}
        prev="/messages"
      />
      <RoomsList />
    </>
  )
}

export const RoomIndex = () => <Outlet />
