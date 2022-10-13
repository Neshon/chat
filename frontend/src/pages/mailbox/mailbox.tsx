import React, { FC, useCallback } from "react"
import styled from "styled-components"
import { useForm } from "react-hook-form"
import { observer } from "mobx-react-lite"
import { NavBar } from "../../core"
import { useRootStore } from "../../store"
import { Button, Logo, H1, InputControl } from "../../@shared"
import { ReactComponent as SetUpBackground } from "../../assets/landing/set-up-background.svg"

const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

interface MailboxForm {
  email: string
}

export const Mailbox: FC = observer(() => {
  const { auth } = useRootStore()

  const { register, handleSubmit, formState } = useForm<MailboxForm>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
  })

  const { errors } = formState

  const onSubmit = useCallback((res: any) => {
    auth.signIn(res)
  }, [])

  return (
    <>
      <NavBar
        prev="/landing"
        body={Logo}
      />

      <Container>
        <SetUpBackground width="100%" />
        <H1>Balley is free forever. No ads and subscription fees</H1>
        <InputControl
          autoComplete="off"
          type="text"
          className={errors["email"]?.type ? "error" : ""}
          placeholder="Email Address"
          {...register("email", {
            required: true,
            pattern: {
              value: pattern,
              message: "Invalid mail",
            },
          })}
        />
        <Button
          type="submit"
          className="secondary full"
          disabled={!!errors["email"]?.type}
          onClick={handleSubmit(onSubmit)}>
          Send login code
        </Button>
      </Container>
    </>
  )
})

const Container = styled.form`
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: min-content;
  grid-gap: 1.25rem;
  align-content: flex-end;
  height: 100%;
  padding: 2rem 2rem 3.75rem;
  position: relative;

  & svg {
    width: 100%;
    height: auto;
    position: absolute;
    left: 0;
    right: 0;
  }
`
