import React from 'react';
import Form from '../../components/Shared/Forms/Form';
import FormHero from '../../components/Shared/FormHero/FormHero';
import styles from "./Login.module.css"

function Login() {
  return (
    <section className={styles.section}>
      <FormHero />
      <Form variant="login" />
    </section>
  )
}

export default Login
