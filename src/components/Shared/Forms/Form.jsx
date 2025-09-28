import React, { useState, useRef, useEffect } from "react";
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
  const [loginSubmittedData, setLoginSubmittedData] = useState(null);
  const [registrationErrors, setRegistrationErrors] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
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
      if (!prev?.error?.[name]) return prev;
      return {
        error: {
          ...prev.error,
          [name]: undefined
        }
      }
    })
  };
  const validateInputs = () => {
    const errors = {};

    if (!loginData.email || loginData.email.length < 3) {
      errors.email = "Email must be at least 3 characters";
    }

    if (!loginData.password || loginData.password.length < 3) {
      errors.password = "Password must be at least 3 characters";
    }

    if (registrationData.password !== registrationData.confirmPassword) {
      errors.passwordMatch =
        "Confirmation password does not match the password";
    }

    return errors;
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const errors = validateInputs();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});

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
      setLoginSubmittedData({ success: "Logged in successfully" });
      setLoginData({ email: "", password: "" });
      navigate(ROUTES.HOME)
    } catch (error) {
      if (error.response) {
        setLoginSubmittedData({ error: error.response.data.message });
      } else {
        console.error("Error logging in:", error);
      }
    }
  };

  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();

    const errors = validateInputs();
    if (errors.passwordMatch) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});

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
      login(response.data.user, response.data.token)

      setRegistrationData({
        avatar: null,
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // navigate user to products page after automatic login
      navigate(ROUTES.HOME)
    } catch (error) {
      if (error.response) {
        if (error.response) {
          const apiErrors = error.response.data.errors;
          setRegistrationErrors({error: apiErrors})
        }
      } else {
        console.error("Error submitting registration:", error.message);
      }
    }
  };
  useEffect(() => {
    console.log(registrationErrors)
  }, [registrationErrors])
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
                {validationErrors.email && (
                  <p className={styles.errorMsg}>{validationErrors.email}</p>
                )}
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
                {validationErrors.password && (
                  <p className={styles.errorMsg}>{validationErrors.password}</p>
                )}
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
                {registrationErrors?.error?.username && <p className={styles.registrationErrorMsg}>{registrationErrors?.error?.username[0]}</p>}
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
                {registrationErrors?.error?.email && <p className={styles.registrationErrorMsg}>{registrationErrors?.error?.email[0]}</p>}
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
                 {registrationErrors?.error?.password && <p className={styles.registrationErrorMsg}>{registrationErrors?.error?.password[0]}</p>}
                <FontAwesomeIcon
                  icon={faEye}
                  className={styles.passwordVisibilityToggle}
                  onClick={() => togglePaswordVisibility("confirmPassword")}
                />
                {validationErrors.passwordMatch && (
                  <p className={styles.errorMsg}>
                    {validationErrors.passwordMatch}
                  </p>
                )}
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
      {/* {loginSubmittedData?.error && (
        <p className={styles.errorMsg}>{loginSubmittedData.error}</p>
      )}
      {loginSubmittedData?.success && (
        <p className={styles.successMsg}>{loginSubmittedData.success}</p>
      )} */}
    </div>
  );
}

export default Form;
