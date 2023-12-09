import React from "react";
import { validationConfig } from "../utils/constant";
import Popup from "./Popup";

function PopupWithForm({
  name,
  title,
  buttonText,
  children,
  isOpen,
  onClose,
  onSubmit,
  isSubmitEnabled,
  isValid,
}) {
  const submitButtonRef = React.useRef();

  React.useEffect(() => {
    if (isValid) {
      submitButtonRef.current.disabled = false;
    } else {
      submitButtonRef.current.disabled = true;
    }
  });

  return (
    // <section className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
    //   <div className="popup__container">
    //     <button
    //       className="popup__close-button"
    //       type="button"
    //       aria-label="Закрыть"
    //       onClick={onClose}
    //     />
    <Popup type="form" isOpen={isOpen} onClose={onClose}>
      <h2 className="popup__title">{title}</h2>
      <form
        className="popup__form"
        name={`${name}`}
        onSubmit={onSubmit}
        noValidate
      >
        {children}
        <button
          type="submit"
          ref={submitButtonRef}
          className={`popup__button ${
            !isValid ? "popup__button_inactive" : ""
          }`}
        >
          {buttonText}
        </button>
      </form>
    </Popup>
    //   </div>
    // </section>
  );
}

export default PopupWithForm;
