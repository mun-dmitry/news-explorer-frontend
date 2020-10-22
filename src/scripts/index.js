import '../styles/index.css';

const Popup = require('./components/Popup');
const Form = require('./components/Form');
const FormValidator = require('./utils/FormValidator');
const MainApi = require('./api/MainApi');
const NewsApi = require('./api/NewsApi');
const Header = require('./components/Header');
const SearchForm = require('./components/SearchForm');
const NewsCardList = require('./components/NewsCardList');
const NewsCard = require('./components/NewsCard');
const dateConverter = require('./utils/dateConverter');
const logOut = require('./utils/logOutFunction');
const {
  TEMPLATES,
  REGEXPS,
  ERROR_MESSAGES,
  PAGE_ELEMENTS,
  HEADER_PROPS,
  SEARCH_FORM_PROPS,
  CARDLIST_PROPS,
} = require('./constants/constants');
const { NEWS_API_CONFIG, MAIN_API_CONFIG } = require('./constants/config');

const mainApi = new MainApi(MAIN_API_CONFIG);
const newsApi = new NewsApi(NEWS_API_CONFIG);
const header = new Header(HEADER_PROPS);

const createFormValidator = (arg) => new FormValidator(arg, ERROR_MESSAGES, REGEXPS);
function createForm() {
  return new Form(TEMPLATES.login, TEMPLATES.registration, createFormValidator);
}
const createNewsCard = (arg) => new NewsCard(arg, TEMPLATES.card, dateConverter, mainApi);

const cardList = new NewsCardList(CARDLIST_PROPS, createNewsCard);
header.render(localStorage);

function sendRequest(keywords) {
  if (cardList.view) {
    cardList.remove();
  }
  cardList.create();
  const getResponseData = newsApi.getNews(keywords);
  getResponseData.then((data) => cardList.renderResults(data));
}

const popup = new Popup(TEMPLATES, PAGE_ELEMENTS.page, createForm, mainApi, header);
const searchForm = new SearchForm(SEARCH_FORM_PROPS, sendRequest);

PAGE_ELEMENTS.authorizeButton.addEventListener('click', popup.open);
PAGE_ELEMENTS.navigationButton.addEventListener('click', header.showMobileView);
PAGE_ELEMENTS.searchButton.addEventListener('click', searchForm.getNews);
PAGE_ELEMENTS.logoutButton.onclick = logOut;
