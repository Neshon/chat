import { Landing, Mailbox, Room, RoomIndex, Rooms, Splash } from "../../../pages"
import { Navigate, RouteObject } from "react-router"

export const route: RouteObject[] = [
  {
    path: "",
    element: <Splash />,
  },
  {
    path: "landing",
    element: <Landing />,
  },
  {
    path: "mailbox",
    element: <Mailbox />,
  },
  {
    path: "/messages",
    element: <RoomIndex />,
    children: [
      {
        path: "/messages",
        index: true,
        element: <Rooms />,
      },
      {
        path: "/messages/:id",
        element: <Room />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/messages" />,
  },
]
