import React from "react";

function Form({ name, onSubmit, isValid, buttonText, children, isPopupForm }) {
  const submitButtonRef = React.useRef();

  React.useEffect(() => {
    if(isValid) {
      submitButtonRef.current.disabled = false;
    } else {
      submitButtonRef.current.disabled = true;
    }
  });

  return (
    <form
      className={`form ${isPopupForm ? "form_type_popup" : "form_type_signin-register"}`}
      name={`${name}`}
      onSubmit={onSubmit}
      noValidate
    >
      {children}
      <button
        type="submit"
        ref={submitButtonRef}
        className={`form__button ${!isValid ? "form__button_inactive" : ""} ${
          isPopupForm ? "form__button_popup" : "form__button_signin-register"
        }`}
      >
        {buttonText}
      </button>
    </form>
  );
}

export default Form;