import React from "react";
import { Link } from "react-router-dom";
import Form from "./Form";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function Register({ onRegister }) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormAndValidation();

  React.useEffect(() => {
    resetForm({ email: "", password: "" }, { email: "", password: "" }, false);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    onRegister({
      email: values.email,
      password: values.password,
    })
    .then((res) => {
      resetForm();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="login-register">
      <h1 className="login-register__title">Регистрация</h1>
      <Form
        name="register"
        onSubmit={handleSubmit}
        isValid={isValid}
        buttonText="Зарегистрироваться"
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
      <div className="login-register__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="/login" className="login-register__login-link">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
