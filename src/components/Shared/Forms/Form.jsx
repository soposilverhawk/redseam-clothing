import React, { useEffect, useState } from "react";
import styles from "./Form.module.css";
import ActionBtn from "../ActionBtn/ActionBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/Routes";

function Form({ variant }) {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginSubmittedData, setLoginSubmittedData] = useState(null);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePaswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }
  const handleLoginChange = (event) => {
    const { name } = event.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: event.target.value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://api.redseam.redberryinternship.ge/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: loginData.email,
            password: loginData.password,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        // SUCCESS
        localStorage.setItem("token", data.token);
        setLoginSubmittedData({ success: "Logged in successfully" });
        setLoginData({ email: "", password: "" });
      } else {
        // FAILURE
        setLoginSubmittedData({ error: data.message });
      }

      // Clear the form
      setLoginData({ email: "", password: "" });
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  const renderForm = () => {
    switch (variant) {
      case "login":
        return (
          <>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
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
                  type={showPassword.password ? "text" : "password"}
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
                  onClick={() => togglePaswordVisibility("password")}
                />
              </div>
              <ActionBtn size="small">Log in</ActionBtn>
            </form>
            <p className={styles.membershipMessage}>
              Not a member? <span onClick={() => navigate(ROUTES.REGISTER)}>Register</span>
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
                <input type={showPassword.password ? "text" : "password"} required placeholder="" name="password"/>
                <span className={styles.placeholder}>
                  Password <span className={styles.required}>*</span>
                </span>
                <FontAwesomeIcon
                  icon={faEye}
                  className={styles.passwordVisibilityToggle}
                  onClick={() => togglePaswordVisibility("password")}
                />
              </div>
              <div className={styles.inputWrapper}>
                <input type={showPassword.confirmPassword ? "text" : "password"} placeholder="" required name="confirmPassword"/>
                <span className={styles.placeholder}>
                  Confirm Password <span className={styles.required}>*</span>
                </span>
                <FontAwesomeIcon
                  icon={faEye}
                  className={styles.passwordVisibilityToggle}
                  onClick={() => togglePaswordVisibility("confirmPassword")}
                />
              </div>
              <ActionBtn size="small">Register</ActionBtn>
            </form>
            <p className={styles.membershipMessage}>
              Already member? <span onClick={() => navigate(ROUTES.LOGIN)}>Log in</span>
            </p>
          </>
        );
    }
  };
  return (
    <div className={styles.formWrapper}>
      <h1>{variant === "login" ? "Log in" : "Registration"}</h1>
      {renderForm()}
      {loginSubmittedData?.error && (
        <p className={styles.errorMsg}>{loginSubmittedData.error}</p>
      )}
      {loginSubmittedData?.success && (
        <p className={styles.successMsg}>{loginSubmittedData.success}</p>
      )}
    </div>
  );
}

export default Form;
