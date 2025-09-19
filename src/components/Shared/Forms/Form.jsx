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
              <input type="email" placeholder="Email *" required />
              <input type="password" placeholder="Password *" required />
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
              <input type="text" placeholder="Username *" required />
              <input type="email" placeholder="Email *" required />
              <input type="password" placeholder="Password *" required />
              <input
                type="password"
                placeholder="Confirm password *"
                required
              />
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
