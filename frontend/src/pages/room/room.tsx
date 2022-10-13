import React, { FC } from "react"
import styled from "styled-components"
import { ChatForm } from "./chat-form"
import { Bubbles } from "./bubbles"
import { NavBar } from "../../core"

export const Room: FC = () => {
  return (
    <>
      <NavBar
        deep
        prev="/messages"
      />
      <Container>
        <Bubbles />
        <ChatForm />
      </Container>
    </>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr min-content;
  height: 100%;
`
