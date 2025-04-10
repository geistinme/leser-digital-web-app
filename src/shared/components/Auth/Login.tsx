import React from "react";

import { Button, Flex, Spacing, Typography } from "@sampled-ui/base";
import { Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";

import { TextInput } from "../../../shared/components";

interface LoginProps {
  onSubmit: (values: { email: string; password: string }) => void;
  error?: string;
}

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login: React.FC<LoginProps> = ({ onSubmit, error }) => {
  const navigate = useNavigate();

  return (
    <Flex direction="column" gap="lg" align="stretch" style={{ width: "100%" }}>
      <Flex direction="column" align="center" gap="md">
        <Typography.Heading level={4}>Willkommen zurück</Typography.Heading>
        <Typography.Text variant="secondary">
          Geb deine Email ein um dich anzumelden
        </Typography.Text>
        {error ? (
          <Spacing gap="md" style={{ paddingBottom: "initial" }}>
            <Typography.Text variant="danger">{error}</Typography.Text>
          </Spacing>
        ) : null}
      </Flex>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={loginValidationSchema}
      >
        {({ submitForm }) => (
          <Flex direction="column" gap="lg" align="stretch">
            <TextInput
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
            />
            <TextInput
              label="Password"
              extra={
                <Typography.Link
                  textProps={{ underline: true }}
                  onClick={() =>
                    navigate("/auth/forgot-password", { replace: true })
                  }
                >
                  Passwort vergessen?
                </Typography.Link>
              }
              name="password"
              type="password"
              placeholder="Password"
            />
            <Button onClick={submitForm} style={{ marginTop: "0.5rem" }}>
              Login
            </Button>
          </Flex>
        )}
      </Formik>
      <Flex gap="sm" align="center" justify="center">
        <Typography.Text>Noch nicht registriert? </Typography.Text>
        <Typography.Link
          onClick={() => navigate("/auth/signup", { replace: true })}
          textProps={{ underline: true }}
        >
          Jetzt registrieren
        </Typography.Link>
      </Flex>
    </Flex>
  );
};

export default Login;
