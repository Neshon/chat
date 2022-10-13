export interface IBubble {
  message: {
    text: string
    createdAt: string
    id: string
    user: {
      username: string
    }
  }
}
