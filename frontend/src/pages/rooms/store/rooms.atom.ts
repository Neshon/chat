import { atom } from "recoil"

export const roomsAtom = atom<any[]>({
  key: "RoomsAtom",
  default: [],
  effects: [
    ({ setSelf }) => {
      fetch("http://127.0.0.1:8000/api/v1/rooms/?format=json&page=1")
        .then((v) => v.json())
        .then(({ results }) => {
          setSelf((v) => {
            if (Array.isArray(v)) {
              return v.concat(results ?? [])
            }
            return v
          })
        })
        .catch(console.log)
    },
  ],
})
