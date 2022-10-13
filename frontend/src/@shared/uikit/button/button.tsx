import styled from "styled-components"

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 100ms linear;
  border-radius: 5px;
  height: 3.4375rem;

  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1rem;
  letter-spacing: 1px;
  color: var(--color-white);
  text-decoration: none;

  &.primary {
    background-color: rgba(10, 10, 10, 1);

    &:active,
    &:hover {
      background-color: rgba(10, 10, 10, 0.5);
    }
  }

  &.secondary {
    color: rgba(10, 10, 10, 1);
    background-color: var(--color-white);
  }

  &.full {
    width: 100%;
  }
`
