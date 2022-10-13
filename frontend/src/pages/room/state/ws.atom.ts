const create = async () => {
  return await new Promise<WebSocket>((resolve, reject) => {
    const ws = new WebSocket("ws://0.0.0.0:8000/ws/room/")

    ws.addEventListener("open", () => {
      resolve(ws)
    })

    ws.addEventListener("error", (ev) => {
      console.warn(ev)
    })

    ws.addEventListener("close", (ev) => {
      console.warn(ev)
    })
  })
}

export const ws = create()
