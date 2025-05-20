import React, { useMemo, useRef } from "react"

import { Button, Card, Flex, Spacing, Typography } from "@sampled-ui/base"

import { useAuthRedirect } from "../../../shared/components/PrivatePage/hooks"

interface LoggedOutCallToActionProps {}

const LoggedOutCallToAction: React.FC<LoggedOutCallToActionProps> = () => {
  const ref = useRef<HTMLDivElement>(null)
  const width = useMemo(() => {
    return ref.current?.getBoundingClientRect().width
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current])

  const { redirect } = useAuthRedirect()

  const handleClick = () => {
    redirect()
  }

  return (
    <Card
      style={
        width ? { position: "fixed", width, maxWidth: "18rem" } : undefined
      }
      ref={ref}
    >
      <Spacing gap="lg">
        <Flex direction="column" gap="md" align="start">
          <Typography.Heading level={5}>
            Einfach, mehr, lesen.
          </Typography.Heading>
          <Typography.Paragraph>
            Verpasse nichts mehr von den Nachrichten die dich interessieren. Ob
            Politik, Technologie, Kultur oder Finanzen, du entscheidest was du
            lesen möchtest.
          </Typography.Paragraph>
          <Button onClick={handleClick}>Jetzt anmelden</Button>
          <Typography.Text size="xs" disabled>
            {new Date().getFullYear()} Leser Digital
          </Typography.Text>
        </Flex>
      </Spacing>
    </Card>
  )
}

export default LoggedOutCallToAction
