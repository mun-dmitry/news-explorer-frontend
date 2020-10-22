import '../styles/index.css';
import { NewsCardList } from './components/NewsCardList';
import { Popup } from './components/Popup';
import { Form } from './components/Form';
import { FormValidator } from './utils/FormValidator';
import { MainApi } from './api/MainApi';
import { NewsApi } from './api/NewsApi';
import { Header } from './components/Header';
import { SearchForm } from './components/SearchForm';
import { NewsCard } from './components/NewsCard';
import { dateConverter } from './utils/dateConverter';
import { logOut } from './utils/logOutFunction';
import { NEWS_API_CONFIG, MAIN_API_CONFIG } from './constants/config';
import {
  TEMPLATES,
  REGEXPS,
  ERROR_MESSAGES,
  PAGE_ELEMENTS,
  HEADER_PROPS,
  SEARCH_FORM_PROPS,
  CARDLIST_PROPS,
} from './constants/constants';

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
  PAGE_ELEMENTS.searchButton.setAttribute('disabled', true);
  newsApi.getNews(keywords)
    .then((data) => {
      cardList.renderResults(data);
      PAGE_ELEMENTS.searchButton.removeAttribute('disabled');
    })
    .catch((err) => cardList.renderResults(err));
}

const popup = new Popup(TEMPLATES, PAGE_ELEMENTS.page, createForm, mainApi, header);
const searchForm = new SearchForm(SEARCH_FORM_PROPS, sendRequest);

PAGE_ELEMENTS.authorizeButton.addEventListener('click', popup.open);
PAGE_ELEMENTS.navigationButton.addEventListener('click', header.showMobileView);
PAGE_ELEMENTS.searchButton.addEventListener('click', searchForm.getNews);
PAGE_ELEMENTS.logoutButton.onclick = logOut;
