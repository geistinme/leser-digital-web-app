import React from "react";

import { Flex, Input, Typography } from "@sampled-ui/base";
import { ErrorMessage, useField } from "formik";

import styles from "./TextInput.module.scss";

interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  name: string;
  extra?: React.ReactNode;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  extra,
  ...rest
}) => {
  const [fieldInput] = useField(name);
  return (
    <Flex gap="sm" direction="column" align="stretch">
      <Flex justify="between">
        <Typography.Text bold>{label}</Typography.Text>
        {extra}
      </Flex>
      <Input {...fieldInput} {...rest} />
      {/* <Field name={name} {...rest} className={styles.input} /> */}
      <ErrorMessage
        name={name}
        render={(error) => <span className={styles.error}>{error}</span>}
      />
    </Flex>
  );
};