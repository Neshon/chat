import React, { FC } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import landing from "../../assets/landing/landing-background.png"
import { Button, H1 } from "../../@shared"

export const Landing: FC = () => {
  return (
    <Container>
      <H1>More secure way to send messages with email</H1>
      <Button
        className="primary full"
        as={Link}
        to="/">
        Start messaging
      </Button>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: min-content;
  grid-gap: 1.25rem;
  align-content: flex-end;
  height: 100%;
  position: relative;
  padding: 2rem 2rem 5rem;

  &:after,
  &:before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
  }

  &:before {
    background: rgba(38, 37, 37, 0.87);
    z-index: -1;
  }

  &:after {
    background-image: url(${landing});
    z-index: -2;
  }
`
