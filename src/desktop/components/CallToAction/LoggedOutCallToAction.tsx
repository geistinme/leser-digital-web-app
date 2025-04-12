import React from "react";

import { Button, Card, Flex, Typography } from "@sampled-ui/base";

interface LoggedOutCallToActionProps {}

const LoggedOutCallToAction: React.FC<LoggedOutCallToActionProps> = () => {
  return (
    <Card style={{ maxWidth: "18rem" }}>
      <Flex
        direction="column"
        gap="md"
        align="start"
      >
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
