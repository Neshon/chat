import { atom } from "recoil"
import { IBubble } from "../interfaces"
import { ws } from "./ws.atom"

export const bubblesAtom = atom<IBubble[]>({
  key: "BubblesAtom",
  default: [],
  effects: [
    ({ setSelf }) => {
      // const id = setInterval(() => {
      //   setSelf((v) => {
      //     if (Array.isArray(v)) {
      //       return v.concat([
      //         {
      //           createdAt: new Date().toJSON(),
      //           message: {
      //             text: v.length.toString(),
      //           },
      //           id: parseInt(String(Math.random() * 10000)).toString(),
      //         },
      //       ])
      //     }
      //
      //     return v
      //   })
      // }, 10000)
      //
      // return () => {
      //   clearInterval(id)
      // }

      ws.then((connect) => {
        connect.addEventListener("message", (message: any) => {
          setSelf((v) => {
            if (Array.isArray(v)) {
              return v.concat(JSON.parse(message.data))
            }
            return v
          })
        })
      })
    },
    // ({ setSelf }) => {
    //   fetch("http://127.0.0.1:8000/api/v1/messages/?format=json&page=1")
    //     .then((v) => v.json())
    //     .then(({ results }) => {
    //       setSelf((v) => [...results, ...(v as IBubble[])])
    //     })
    // },
  ],
})
