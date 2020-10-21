const NEWS_API_CONFIG = {
  apiKey: 'f8fe7339df5a4e7b9a2b7417e5f6c45c',
  timeDifference: -604800000,
  date: new Date(),
  pageSize: 100,
  url: 'http://newsapi.org/v2/everything?',
};

const MAIN_API_CONFIG = {
  baseUrl: 'https://api.yapr-news-explorer.tk/',
};

module.exports = {
  NEWS_API_CONFIG,
  MAIN_API_CONFIG,
};
