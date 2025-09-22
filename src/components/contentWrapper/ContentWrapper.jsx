import React from "react";
import styles from "./ContentWrapper.module.css";

function ContentWrapper({children}) {
  return <div className={styles.contentWrapper}>
    {children}
  </div>;
}

export default ContentWrapper;
