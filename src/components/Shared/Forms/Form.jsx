import React, { useState, useEffect } from "react";
import styles from "./Form.module.css";
import ActionBtn from "../ActionBtn/ActionBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/Routes";
import AvatarUpload from "../../avatarUpload/AvatarUpload";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

function Form({ variant }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  const [registrationErrors, setRegistrationErrors] = useState(null);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [registrationData, setRegistrationData] = useState({
    avatar: null,
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const togglePaswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleRegistrationChange = (event) => {
    const { name, value } = event.target;
    setRegistrationData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setRegistrationErrors((prev) => {
      if (!prev?.error) return null; // nothing to clear
      const newErrors = { ...prev.error };
      delete newErrors[name];
      return { error: newErrors }; // always a new object
    });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://api.redseam.redberryinternship.ge/api/login",
        {
          email: loginData.email,
          password: loginData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      // SUCCESS
      login(response.data.user, response.data.token);
      setLoginData({ email: "", password: "" });
      navigate(ROUTES.HOME);
    } catch (error) {
      setLoginError(error);
    }
  };

  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (registrationData.avatar) {
      formData.append("avatar", registrationData.avatar);
    }
    formData.append("username", registrationData.username);
    formData.append("email", registrationData.email);
    formData.append("password", registrationData.password);
    formData.append("password_confirmation", registrationData.confirmPassword);

    try {
      const response = await axios.post(
        "https://api.redseam.redberryinternship.ge/api/register",
        formData,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      // automatic login on successful registration
      login(response.data.user, response.data.token);

      setRegistrationData({
        avatar: null,
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // navigate user to products page after automatic login
      navigate(ROUTES.HOME);
    } catch (error) {
      if (error.response) {
        if (error.response) {
          const apiErrors = error.response.data.errors;
          setRegistrationErrors({ error: apiErrors });
        }
      } else {
        console.error("Error submitting registration:", error.message);
      }
    }
  };

  
  const renderForm = () => {
    switch (variant) {
      case "login":
        return (
          <>
            <form
              className={styles.form}
              onSubmit={(e) => handleLoginSubmit(e)}
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
                {loginError && (
                  <p className={styles.validationErrorMsg}>Incorrect email or password</p>
                )}
                <FontAwesomeIcon
                  icon={faEye}
                  className={styles.passwordVisibilityToggle}
                  onClick={() => togglePaswordVisibility("password")}
                />
              </div>
              <ActionBtn size="small">Log in</ActionBtn>
            </form>
            <p className={styles.membershipMessage}>
              Not a member?
              <span onClick={() => navigate(ROUTES.REGISTER)}> Register</span>
            </p>
          </>
        );
      case "registration":
        return (
          <>
            <form
              className={styles.form}
              onSubmit={(e) => handleRegistrationSubmit(e)}
            >
              <AvatarUpload
                onFileSelect={(file) =>
                  setRegistrationData((prev) => ({ ...prev, avatar: file }))
                }
              />
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  required
                  placeholder=""
                  name="username"
                  value={registrationData.username}
                  onChange={(e) => handleRegistrationChange(e)}
                />
                <span className={styles.placeholder}>
                  Username <span className={styles.required}>*</span>
                </span>
                {registrationErrors?.error?.username && (
                  <p className={styles.validationErrorMsg}>
                    {registrationErrors?.error?.username[0]}
                  </p>
                )}
              </div>
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  required
                  placeholder=""
                  name="email"
                  value={registrationData.email}
                  onChange={(e) => handleRegistrationChange(e)}
                />
                <span className={styles.placeholder}>
                  Email <span className={styles.required}>*</span>
                </span>
                {registrationErrors?.error?.email && (
                  <p className={styles.validationErrorMsg}>
                    {registrationErrors?.error?.email[0]}
                  </p>
                )}
              </div>
              <div className={styles.inputWrapper}>
                <input
                  type={showPassword.password ? "text" : "password"}
                  required
                  placeholder=""
                  name="password"
                  value={registrationData.password}
                  onChange={(e) => handleRegistrationChange(e)}
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
              <div className={styles.inputWrapper}>
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  placeholder=""
                  required
                  name="confirmPassword"
                  value={registrationData.confirmPassword}
                  onChange={(e) => handleRegistrationChange(e)}
                />
                <span className={styles.placeholder}>
                  Confirm Password <span className={styles.required}>*</span>
                </span>
                {registrationErrors?.error?.password && (
                  <p className={styles.validationErrorMsg}>
                    {registrationErrors?.error?.password[0]}
                  </p>
                )}
                <FontAwesomeIcon
                  icon={faEye}
                  className={styles.passwordVisibilityToggle}
                  onClick={() => togglePaswordVisibility("confirmPassword")}
                />
              </div>
              <ActionBtn size="small">Register</ActionBtn>
            </form>
            <p className={styles.membershipMessage}>
              Already member?
              <span onClick={() => navigate(ROUTES.LOGIN)}> Log in</span>
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
