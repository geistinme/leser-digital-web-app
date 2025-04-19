import React from "react";

import { Button, Flex, Typography } from "@sampled-ui/base";
import { Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";

import { CreateUserInput } from "../../../../generated/graphql";
import { TextInput } from "../../../shared/components";

interface SignupProps {
  onSubmit: (values: CreateUserInput) => void;
}

const signupValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "()<>:;,+-=*]).*$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
  repeat: Yup.string()
    .required("Please repeat your password")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});

const Signup: React.FC<SignupProps> = ({ onSubmit }) => {
  const navigate = useNavigate();

  return (
    <Flex direction="column" gap="lg" align="stretch" style={{ width: "100%" }}>
      <title>Registrierung</title>
      <Flex direction="column" align="center" gap="md">
        <Typography.Heading level={4}>Neu anmelden</Typography.Heading>
        <Typography.Text variant="secondary">
          Geb deine Daten ein um dich zu registrieren
        </Typography.Text>
      </Flex>
      <Formik
        initialValues={{ name: "", email: "", password: "", repeat: "" }}
        onSubmit={({ name, email, password }) =>
          onSubmit({ name, email, password })
        }
        validationSchema={signupValidationSchema}
      >
        {({ submitForm }) => (
          <Flex gap="md" direction="column" align="stretch">
            <TextInput label="Name" name="name" placeholder="Jane Doe" />
            <TextInput
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
            />
            <TextInput
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
            />
            <TextInput
              label="Repeat Password"
              name="repeat"
              type="password"
              placeholder="Repeat Password"
            />
            <Button onClick={submitForm} style={{ marginTop: "1rem" }}>
              Registrieren
            </Button>
          </Flex>
        )}
      </Formik>
      <Flex gap="sm" align="center" justify="center">
        <Typography.Text>Du hast dich schon registriert?</Typography.Text>
        <Typography.Link
          onClick={() => navigate("/auth/login", { replace: true })}
          textProps={{ underline: true }}
        >
          Zur Anmeldung
        </Typography.Link>
      </Flex>
    </Flex>
  );
};

export default Signup;
