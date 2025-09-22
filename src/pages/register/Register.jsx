import React from "react";
import Form from "../../components/Shared/Forms/Form";
import FormHero from "../../components/Shared/FormHero/FormHero";
import styles from "./Register.module.css";

function Register() {
  return (
    <section className={styles.section}>
      <FormHero />
      <Form variant="registration" />
    </section>
  );
}

export default Register;
