import React, { createElement, FC, useCallback } from "react"
import styled from "styled-components"
import { useLocation, useNavigate } from "react-router"
import { ReactComponent as GoBackIcon } from "../../../assets/icons/go-back.svg"

interface INavBar {
  deep?: boolean
  title?: string
  body?: FC
  prev: string
}

export const NavBar: FC<INavBar> = ({ deep = false, title, prev, body }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const onBack = useCallback(
    (prev: string) => () => {
      navigate(prev)
    },
    [navigate]
  )

  return (
    <Container>
      <button
        className="go-back"
        onClick={onBack(prev)}
        style={{ opacity: +deep }}>
        <GoBackIcon />
      </button>
      {body ? (
        <div className="body">{createElement(body)}</div>
      ) : (
        <span className="title">{title ?? location.pathname}</span>
      )}
      <div className="actives"></div>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1.5rem 1fr min-content;
  grid-template-rows: 1.5rem;
  grid-gap: 0.5rem;
  align-content: center;
  flex-shrink: 0;
  padding: 0 1.5rem;
  height: 3rem;

  & > .go-back {
  }

  & > .title {
    justify-self: center;
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.25rem;
    letter-spacing: 1px;
    color: white;
  }

  & > .body {
    justify-self: center;
  }

  & .actives {
  }
`
