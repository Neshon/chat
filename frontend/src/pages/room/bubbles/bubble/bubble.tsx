import React, { FC } from "react"
import styled from "styled-components"
import { IBubble } from "../../interfaces"

export const Bubble: FC<IBubble> = ({ message: { createdAt, text } }) => {
  const data = new Date(createdAt)
  return (
    <Container>
      <span className="create-at">
        {data.getHours()}:{data.getMinutes()}
      </span>
      <div className="message">{text}</div>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 3rem 1fr;
  grid-gap: 1rem;
  padding: 0 2rem;

  & .create-at {
    font-size: 0.75rem;
    line-height: 0.875rem;
    color: var(--color-gray-100);
  }

  & .message {
    border-radius: 1rem 0 1rem 1rem;
    background: var(--color-gray-200);
    padding: 0.75rem;

    font-style: normal;
    font-size: 0.75rem;
    line-height: 0.875rem;
    color: var(--color-black-500);
  }
`
