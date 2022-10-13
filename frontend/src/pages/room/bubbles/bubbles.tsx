import React, { useLayoutEffect, useRef } from "react"
import styled from "styled-components"
import { useVirtual } from "react-virtual"
import { useRecoilValue } from "recoil"
import { motion } from "framer-motion"
import { bubblesAtom } from "../state"
import { Bubble } from "./bubble"

export const Bubbles = () => {
  const parentRef = useRef<HTMLDivElement>(null)
  const scrollable = useRef<HTMLDivElement>(null)
  const bubbles = useRecoilValue(bubblesAtom)

  const { virtualItems, totalSize: height } = useVirtual({
    size: bubbles.length,
    parentRef,
  })

  useLayoutEffect(() => {
    const node = parentRef.current as HTMLDivElement
    node.scrollTo({ top: height, behavior: "smooth" })
  }, [bubbles, height])

  return (
    <Container ref={parentRef}>
      <div
        ref={scrollable}
        className="scrollable"
        style={{ height }}>
        {virtualItems.map(({ key, index, size: height, start }) => (
          <motion.div
            key={key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              height,
              transform: `translateY(${start}px)`,
            }}>
            <Bubble {...bubbles[index]} />
          </motion.div>
        ))}
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  overflow: hidden scroll;

  & .scrollable {
    width: 100%;
    position: relative;

    & > div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
  }
`
