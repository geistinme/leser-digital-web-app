import React, { useMemo, useRef } from "react";

import { Button, Card, Flex, Typography } from "@sampled-ui/base";

interface LoggedOutCallToActionProps {}

const LoggedOutCallToAction: React.FC<LoggedOutCallToActionProps> = () => {
  const ref = useRef<HTMLDivElement>(null);
  const width = useMemo(() => {
    return ref.current?.getBoundingClientRect().width;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  return (
    <Card
      style={
        width ? { position: "fixed", width, maxWidth: "18rem" } : undefined
      }
      ref={ref}
    >
      <Flex direction="column" gap="md" align="start">
        <Typography.Heading level={5}>Einfach, mehr, lesen.</Typography.Heading>
        <Typography.Paragraph>
          Verpasse nichts mehr von den Nachrichten die dich interessieren. Ob
          Politik, Technologie, Kultur oder Finanzen, du entscheidest was du
          lesen möchtest.
        </Typography.Paragraph>
        <Button>Jetzt anmelden</Button>
        <Typography.Text size="xs" disabled>
          {new Date().getFullYear()} Leser Digital
        </Typography.Text>
      </Flex>
    </Card>
  );
};

export default LoggedOutCallToAction;
