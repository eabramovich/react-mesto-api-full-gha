import React from "react";
import Form from "./Form";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import { validationConfig } from "../utils/constant";

function Login({ onLogin }) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormAndValidation();

  React.useEffect(() => {
    resetForm({ email: "", password: "" }, { email: "", password: "" }, false);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    onLogin({
      email: values.email,
      password: values.password,
    });
  }

  return (
    <div className="login-register">
      <h1 className="login-register__title">Вход</h1>
      <Form
        name="login"
        onSubmit={handleSubmit}
        isValid={isValid}
        buttonText="Войти"
        isPopupForm={false}
      >
        <input
          required
          id="email"
          name="email"
          type="email"
          value={values.email ? values.email : ""}
          onChange={handleChange}
          className={`form__input ${
            errors.email ? "form__input_type_error" : ""
          }`}
          placeholder="Email"
        />
        <span
          className={`form__item-error ${
            errors.email ? "form__item-error_active" : ""
          }`}
        >
          {errors.email}
        </span>
        <input
          required
          id="password"
          name="password"
          type="password"
          value={values.password ? values.password : ""}
          onChange={handleChange}
          className={`form__input ${
            errors.password ? "form__input_type_error" : ""
          }`}
          placeholder="Пароль"
        />
        <span
          className={`form__item-error ${
            errors.password ? "form__item-error_active" : ""
          }`}
        >
          {errors.password}
        </span>
      </Form>
    </div>
  );
}

export default Login;
