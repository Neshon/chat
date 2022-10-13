import React, { FC } from "react"
import styled from "styled-components"
import { ReactComponent as LogoIcon } from "../../assets/logo/logo.svg"

interface ILogo {
  width?: string
}

export const Logo: FC<ILogo> = ({ width = "1.75rem" }) => {
  return (
    <Container>
      <LogoIcon
        width={width}
        height="auto"
      />
      <span>Balley</span>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: min-content;
  align-items: center;
  grid-gap: 1rem;

  & span {
    font-weight: 700;
    font-size: 1rem;
    line-height: 1rem;
    letter-spacing: 1px;

    color: var(--color-white);
  }
`
