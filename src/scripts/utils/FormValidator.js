export default class FormValidator {
    constructor (formElement, validationErrorMessages, regexps) {
        this._formElement = formElement;
        this._errorMessages = validationErrorMessages;
        this._regexps = regexps;
    }

    _checkInputValidity = (input) => {
        let isInputValid = true;
        if (input.name === 'email') {
          if (!this._regexps.email.test(input.value)) {
            isInputValid = false;
            input.setCustomValidity('Invalid field');
          } else {
            input.setCustomValidity('');
          }
        } else if (!input.checkValidity()) {
          isInputValid = false;
        }

        return isInputValid;
    }

    _onlineValidationMessage = (event) => {
      const input = event.target;
      if (!this._checkInputValidity(input)) {
        this._setValidationMessage(input);
      } else {
        this._eraseValidationMessage(input);
      }
    }

    _checkFormValidity = () => {
      const inputs = this._formElement.querySelectorAll('input');
      let isFormValid = true;

      inputs.forEach(input => {
        if(!this._checkInputValidity(input)){
          isFormValid = false;
        }
      })

      return isFormValid;
    }

    _setValidationMessage (inputElement) {
        const error = inputElement.parentNode.querySelector('.error');
        if (inputElement.validity.valueMissing) {
            error.textContent = this._errorMessages.emptyInput;
        }
        if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
            error.textContent = this._errorMessages.wrongLength;
        }
        if (inputElement.name === 'email') {
            error.textContent = this._errorMessages.emailTypeMismatch;
        }
    }

    _eraseValidationMessage (inputElement) {
        const error = inputElement.parentNode.querySelector('.error');
        error.textContent = '';
    }

    setSubmitButtonState = (event) => {
        if (event) {event.preventDefault()};
        const submitButton = this._formElement.querySelector('.popup__button');

        if (!this._checkFormValidity()) {
            submitButton.setAttribute('disabled', true);
        } else {
            submitButton.removeAttribute('disabled');
        }
    }

    setEventListeners = () => {
        this._formElement.querySelectorAll('.popup__input').forEach(input => input.addEventListener('input', this._onlineValidationMessage));
        this._formElement.querySelectorAll('.popup__input').forEach(input => input.addEventListener('input', this.setSubmitButtonState));
        this._formElement.querySelector('button').addEventListener('click', this.setSubmitButtonState);
    }
}