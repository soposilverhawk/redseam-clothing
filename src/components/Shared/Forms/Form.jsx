import React from "react";
import styles from "./Form.module.css";
import ActionBtn from "../ActionBtn/ActionBtn";

function Form({ variant }) {
  const renderForm = () => {
    switch (variant) {
      case "login":
        return (
          <>
            <form action="" className={styles.form}>
              <div className={styles.inputWrapper}>
                <input type="email" required placeholder="" />
                <span className={styles.placeholder}>
                  Email <span className={styles.required}>*</span>
                </span>
              </div>

              <div className={styles.inputWrapper}>
                <input type="password" required placeholder="" />
                <span className={styles.placeholder}>
                  Password <span className={styles.required}>*</span>
                </span>
              </div>
              <ActionBtn size="small">Log in</ActionBtn>
            </form>
            <p>
              Not a member? <span>Register</span>
            </p>
          </>
        );
      case "registration":
        return (
          <>
            <form action="" className={styles.form}>
              <input type="file" />
              <div className={styles.inputWrapper}>
                <input type="text" required placeholder="" />
                <span className={styles.placeholder}>
                  Username <span className={styles.required}>*</span>
                </span>
              </div>
              <div className={styles.inputWrapper}>
                <input type="email" required placeholder="" />
                <span className={styles.placeholder}>
                  Email <span className={styles.required}>*</span>
                </span>
              </div>
              <div className={styles.inputWrapper}>
                <input type="password" required placeholder="" />
                <span className={styles.placeholder}>
                  Password <span className={styles.required}>*</span>
                </span>
              </div>
              <div className={styles.inputWrapper}>
                <input
                type="password"
                placeholder=""
                required
              />
              <span className={styles.placeholder}>
                Confirm Password <span className={styles.required}>*</span>
              </span>
              </div>
              <ActionBtn size="small">Register</ActionBtn>
            </form>
            <p>
              Already member? <span>Log in</span>
            </p>
          </>
        );
    }
  };
  return (
    <div className={styles.formWrapper}>
      <h1>{variant === "login" ? "Log in" : "Registration"}</h1>
      {renderForm()}
    </div>
  );
}

export default Form;
