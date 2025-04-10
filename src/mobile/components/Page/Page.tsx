import React from "react";

import { Outlet } from "react-router";

import { Navigation } from "../Navigation";

import styles from "./Page.module.scss";

export const Page: React.FC = () => {
  return (
    <div>
      <div className={styles.outlet}>
        <Outlet />
      </div>
      <Navigation />
    </div>
  );
};
