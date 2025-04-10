import React from "react";

import { Button, Flex, Typography } from "@sampled-ui/base";
import { Formik } from "formik";

import { Verification } from "../../../shared/components";

interface VerifyProps {
  onSubmit: (data: { verificationCode: string }) => void;
  onResendCode: () => void;
  message?: string;
  error?: string;
}

const Verify: React.FC<VerifyProps> = ({
  onSubmit,
  onResendCode,
  message,
  error,
}) => {
  return (
    <Flex
      direction="column"
      align="stretch"
      gap="lg"
      style={{ textAlign: "center" }}
    >
      <Flex direction="column" align="center" gap="md">
        <Typography.Heading level={4}>
          📬 Bestätige deine Email
        </Typography.Heading>
        <Typography.Text bold>
          Nur eine letzte Sache bevor du loslegst
        </Typography.Text>
        <Typography.Text>
          Verifiziere jetzt deinen Account mit dem Code den wir dir geschickt
          haben
        </Typography.Text>
      </Flex>
      <Formik initialValues={{ verificationCode: "" }} onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <Flex direction="column" align="stretch" gap="md">
            <Verification onSubmit={handleSubmit} />
          </Flex>
        )}
      </Formik>
      {message ? (
        <Typography.Text variant="success">{message}</Typography.Text>
      ) : (
        <Button ghost onClick={onResendCode}>
          Code erneut senden
        </Button>
      )}
      {error ? (
        <Typography.Text variant="danger">{error}</Typography.Text>
      ) : null}
    </Flex>
  );
};

export default Verify;
