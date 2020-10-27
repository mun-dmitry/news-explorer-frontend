export class Form {
  constructor (loginTemplate, registrationTemplate, formValidatorCreator) {
    this._loginTemplate = loginTemplate;
    this._registrationTemplate = registrationTemplate;
    this._createFormValidator = formValidatorCreator;
    this.getInfo = this.getInfo.bind(this);
  }

  create = (formType) => {
    if (formType === 'login') {
      this._view = this._loginTemplate.content.cloneNode(true).children[0];
    }
    if (formType === 'registration') {
      this._view = this._registrationTemplate.content.cloneNode(true).children[0];
    }
    const formValidator = this._createFormValidator(this._view.querySelector('form'));
    formValidator.setSubmitButtonState();
    formValidator.setEventListeners();
    this._inputs = this._view.querySelectorAll('input');
    return this._view;
  }

  setServerError = (error) => {
    this._view.querySelector('.error_conflict').textContent = error.message;
    this._view.querySelector('.error_conflict').classList.add('error_visible');
  }

  clear = () => {
    this._inputs.forEach((input) => input.value = '');
    this._view.querySelector('.error_conflict').textContent = '';
    this._view.querySelector('.error_conflict').classList.remove('error_visible');
  }

  getInfo = () => {
    const info = {};
    this._inputs.forEach((input) => {
      info[input.name] = input.value;
    })
    return info;
  }
}