import React from "react";

import { Link } from "react-router";

import styles from "./404Page.module.scss";

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.message}>
        <h1>404</h1>
        <p>The page that you tried to access does not exist.</p>
        <Link to={"/"}>Return to home</Link>
      </div>
    </div>
  );
};
