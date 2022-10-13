import React, { useCallback, KeyboardEvent } from "react"
import styled from "styled-components"
import { useForm } from "react-hook-form"
import { ReactComponent as SentimentIcon } from "../../../assets/icons/sentiment.svg"
import { ReactComponent as AttachIcon } from "../../../assets/icons/attach.svg"
import { ReactComponent as VoiceIcon } from "../../../assets/icons/voice.svg"
import { ws } from "../state/ws.atom"

export const ChatForm = () => {
  const { register, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      message: "",
    },
  })

  const onSubmit = useCallback(
    async ({ message }: any) => {
      const connect = await ws
      connect.send(
        JSON.stringify({
          message,
          username: "root",
          room: "room",
        })
      )
      reset()
    },
    [reset]
  )

  const onKeyPress = useCallback(
    (ev: KeyboardEvent<HTMLTextAreaElement>) => {
      const { key, shiftKey } = ev
      if (key === "Enter" && !shiftKey) {
        ev.preventDefault()
        handleSubmit(onSubmit)()
      }
    },
    [handleSubmit, onSubmit]
  )

  const { isValid } = formState

  return (
    <Container>
      <textarea
        onKeyPress={onKeyPress}
        placeholder="start typin here ........."
        {...register("message", { required: true })}
      />
      <button
        className="sentiment"
        type="button">
        <SentimentIcon />
      </button>
      <button
        className="attach"
        type="button">
        <AttachIcon />
      </button>
      <button
        onClick={handleSubmit(onSubmit)}
        className="voice"
        disabled={!isValid}
        type="button">
        <VoiceIcon />
      </button>
    </Container>
  )
}

const Container = styled.form`
  position: relative;
  height: 3rem;
  margin: 1rem;

  & textarea {
    position: absolute;
    inset: 0;
    background: rgba(218, 218, 218, 0.12);
    border: 1px solid rgba(218, 218, 218, 0.07);
    border-radius: 0.75rem;
    padding: 0.875rem 4.5rem 0.875rem 3.5rem;
    outline: none;

    font-weight: 500;
    font-size: 14px;
    line-height: 1rem;

    color: #ffffff;

    &::placeholder {
      font-weight: 100;
      font-size: 11px;
      line-height: 1rem;
    }
  }

  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    padding: 0;
    top: 50%;
    transform: translateY(-50%);

    &.sentiment {
      right: 3rem;
    }

    &.voice {
      right: 0.75rem;
    }

    &.attach {
      left: 1.5rem;
    }
  }
`
