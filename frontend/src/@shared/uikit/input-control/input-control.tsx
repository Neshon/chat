import styled from "styled-components"

export const InputControl = styled.input`
  display: flex;
  align-items: center;
  height: 3.125rem;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1rem;
  letter-spacing: 0.05em;
  background-color: transparent;
  border: none;
  outline: none;
  color: var(--color-white);
  border-bottom: 0.125rem solid rgba(229, 229, 229, 0.51);

  &::placeholder {
    color: rgba(229, 229, 229, 0.51);
  }

  &.error {
    border-color: red;
  }
`
