import React from "react";

import { useField } from "formik";
import VerificationInput from "react-verification-input";

import styles from "./Verification.module.scss";

interface VerificationInputProps {
  onSubmit: () => void;
}

export const Verification: React.FC<VerificationInputProps> = ({ onSubmit }) => {
  const [field, _meta, helper] = useField<string>("verificationCode");

  return (
    <div className={styles.container}>
      <VerificationInput
        validChars="0-9"
        inputProps={{ inputMode: "numeric" }}
        value={field.value}
        placeholder=""
        onChange={(value) => {
          helper.setValue(value);
        }}
        onComplete={onSubmit}
        classNames={{
          character: styles.character,
          characterInactive: styles.characterInactive,
        }}
      />
    </div>
  );
};