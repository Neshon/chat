import React from "react"
import styled from "styled-components"
import { ReactComponent as LogoIcon } from "../../assets/logo/logo.svg"

export const Splash = () => {
  return (
    <Container>
      <LogoIcon />
      <span>Balley</span>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-gap: 2rem;
  justify-content: center;
  align-content: center;
  height: 100%;

  & span {
    justify-self: center;
    font-weight: 800;
    font-size: 1rem;
    line-height: 1.125rem;
    letter-spacing: 1px;
    color: var(--color-white);
  }
`
