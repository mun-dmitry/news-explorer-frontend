import '../styles/index.css';
import FormValidator from './utils/FormValidator';

const Popup = require('./components/Popup');
const Form = require('./components/Form');
const Navigation = require('./components/Navigation');
// const FormValidator = require('./utils/FormValidator');
const { TEMPLATES, REGEXPS, ERROR_MESSAGES, PAGE_ELEMENTS } = require('./constants/constants');

const createFormValidator = (arg) => new FormValidator(arg, ERROR_MESSAGES, REGEXPS);
const createForm = () => new Form(TEMPLATES.login, TEMPLATES.registration, createFormValidator);
const createNavigation = () => new Navigation(TEMPLATES.navigation);
const creators = {
  form: createForm,
  navigation: createNavigation,
  validator: createFormValidator,
};

const popup = new Popup(TEMPLATES, PAGE_ELEMENTS.page, creators);
PAGE_ELEMENTS.authorizeButton.addEventListener('click', popup.open);
PAGE_ELEMENTS.navigationButton.addEventListener('click', popup.open);
