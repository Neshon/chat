import React from "react"
import styled from "styled-components"
import { useRecoilValue } from "recoil"
import { roomsAtom } from "../../store"

export const RoomsList = () => {
  const rooms = useRecoilValue(roomsAtom)
  console.log(rooms)
  return (
    <Container>
      {rooms.map(({ room }: any) => (
        <div>{room}</div>
      ))}
    </Container>
  )
}

const Container = styled.div``
