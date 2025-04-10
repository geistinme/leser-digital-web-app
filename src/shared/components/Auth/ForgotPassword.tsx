import React from "react";

import { Button, Flex, Typography } from "@sampled-ui/base";
import { Formik } from "formik";
import * as Yup from "yup";

import { TextInput } from "../../../shared/components";

interface SendLinkProps {
  onSubmit: (data: { email: string }) => void;
  message?: string;
  error?: string;
}

const sendLinkValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const SendLink: React.FC<SendLinkProps> = ({
  onSubmit,
  message,
  error,
}) => {
  return (
    <Flex direction="column" align="stretch" gap="lg" style={{ width: "100%" }}>
      <Flex direction="column" align="center" gap="md">
        <Typography.Heading level={4}>
          📬 Passwort zurücksetzen
        </Typography.Heading>
        {message ? (
          <Typography.Text variant="success">{message}</Typography.Text>
        ) : null}
        {error ? (
          <Typography.Text variant="danger">{error}</Typography.Text>
        ) : null}
      </Flex>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={sendLinkValidationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <Flex direction="column" align="stretch" gap="md">
            <TextInput
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
            />
            <Button
              onClick={() => handleSubmit()}
              style={{ marginTop: "1rem" }}
            >
              Link senden
            </Button>
          </Flex>
        )}
      </Formik>
    </Flex>
  );
};

interface ResetPasswordProps {
  onSubmit: (data: { password: string }) => void;
  message?: string;
  error?: string;
}

const resetPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
  repeat: Yup.string()
    .required("Please repeat your password")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});

export const ResetPassword: React.FC<ResetPasswordProps> = ({
  onSubmit,
  message,
  error,
}) => {
  return (
    <Flex direction="column" align="stretch" gap="lg">
      <Flex direction="column" align="center" gap="md">
        <Typography.Heading level={4}>
          🔒 Passwort zurücksetzen
        </Typography.Heading>
        {message ? (
          <Typography.Text variant="success">{message}</Typography.Text>
        ) : (
          <Typography.Text>
            Erstelle ein neues Passwort für deinen Account
          </Typography.Text>
        )}
        {error ? (
          <Typography.Text variant="danger">{error}</Typography.Text>
        ) : null}
      </Flex>
      {message || error ? null : (
        <Formik
          initialValues={{ password: "" }}
          validationSchema={resetPasswordValidationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <Flex direction="column" align="stretch" gap="md">
              <TextInput
                label="Passwort"
                name="password"
                type="password"
                placeholder="Passwort"
              />
              <TextInput
                label="Passwort wiederholen"
                name="repeat"
                type="password"
                placeholder="Passwort"
              />
              <Button
                onClick={() => handleSubmit()}
                style={{ marginTop: "1rem" }}
              >
                Passwort zurücksetzen
              </Button>
            </Flex>
          )}
        </Formik>
      )}
    </Flex>
  );
};
