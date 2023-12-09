import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function ConfirmationPopup({ isOpen, onClose, onConfirmAction, submitButtonText}) {
    const {isValid, setIsValid} = useFormAndValidation();

    React.useEffect(() => {
        setIsValid(true);
    },[isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onConfirmAction();
    }

    return (
        <PopupWithForm
            name="confirm-form"
            title="Вы уверенны"
            buttonText={submitButtonText}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isValid={isValid}
        />
    );
}

export default ConfirmationPopup;