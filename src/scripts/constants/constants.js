const TEMPLATES = {
  popup: document.querySelector('#popup-template'),
  navigation: document.querySelector('#navigation-template'),
  login: document.querySelector('#login-template'),
  registration: document.querySelector('#registration-template'),
  success: document.querySelector('#success-template'),
};

const REGEXPS = {
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.([a-zA-Z0-9-]+)+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
};

const ERROR_MESSAGES = {
  emptyInput: 'Это обязательное поле',
  wrongLength: 'Должно быть от 6 до 30 символов',
  emailTypeMismatch: 'Неверный формат email',
  passwordMismatch: 'Пароль должен содержать не менее 6 символов, из которых не менее 1 цифры, не менее 1 строчной и 1 заглавной буквы. Пароль может содержать только буквы латинского алфавита и цифры',
};

const PAGE_ELEMENTS = {
  page: document.querySelector('.page'),
  authorizeButton: document.querySelector('.header__bordered-button'),
  navigationButton: document.querySelector('.header__menu-button'),
  header: document.querySelector('.header'),
  articlesLink: document.querySelector('.articles-link'),
  logoutButton: document.querySelector('.logout'),
};

module.exports = {
  TEMPLATES,
  REGEXPS,
  ERROR_MESSAGES,
  PAGE_ELEMENTS,
};
