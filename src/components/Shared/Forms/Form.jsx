import React, { useEffect, useState } from "react";
import styles from "./Form.module.css";
import ActionBtn from "../ActionBtn/ActionBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

function Form({ variant }) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginSubmittedData, setLoginSubmittedData] = useState(null);
  const [isLoginSubmitted, setIsLoginSubmitted] = useState(false);
  const handleLoginChange = (event) => {
    const { name } = event.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoginSubmittedData(loginData);
    setLoginData({
      email: "",
      password: "",
    });
  };
  useEffect(() => {
    if (loginSubmittedData) {
      console.log("Submitted data", loginSubmittedData);
    }
  }, [loginSubmittedData]);
  const renderForm = () => {
    switch (variant) {
      case "login":
        return (
          <>
            <form
              action=""
              className={styles.form}
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  required
                  placeholder=""
                  name="email"
                  value={loginData.email}
                  onChange={(e) => handleLoginChange(e)}
                />
                <span className={styles.placeholder}>
                  Email <span className={styles.required}>*</span>
                </span>
              </div>

              <div className={styles.inputWrapper}>
                <input
                  type="password"
                  required
                  placeholder=""
                  name="password"
                  value={loginData.password}
                  onChange={(e) => handleLoginChange(e)}
                />
                <span className={styles.placeholder}>
                  Password <span className={styles.required}>*</span>
                </span>
                <FontAwesomeIcon
                  icon={faEye}
                  className={styles.passwordVisibilityToggle}
                />
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
                <FontAwesomeIcon
                  icon={faEye}
                  className={styles.passwordVisibilityToggle}
                />
              </div>
              <div className={styles.inputWrapper}>
                <input type="password" placeholder="" required />
                <span className={styles.placeholder}>
                  Confirm Password <span className={styles.required}>*</span>
                </span>
                <FontAwesomeIcon
                  icon={faEye}
                  className={styles.passwordVisibilityToggle}
                />
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
