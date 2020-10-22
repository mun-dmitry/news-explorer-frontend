const NEWS_API_CONFIG = {
  apiKey: 'b2b5393601294bbeabf856d225c749b8',
  timeDifference: -604800000,
  date: new Date(),
  pageSize: 100,
  url: 'https://nomoreparties.co/news/v2/everything?',
  //  'http://newsapi.org/v2/everything?'  proxyUrl
  //  'f8fe7339df5a4e7b9a2b7417e5f6c45c'   secondKey
};

const MAIN_API_CONFIG = {
  baseUrl: 'https://api.yapr-news-explorer.tk/',
};

export {
  NEWS_API_CONFIG,
  MAIN_API_CONFIG,
};
