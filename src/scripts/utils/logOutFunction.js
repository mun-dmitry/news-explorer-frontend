module.exports = function logOut() {
  localStorage.setItem('isLoggedIn', 'false');
  localStorage.removeItem('userName');
  localStorage.removeItem('token');
  // eslint-disable-next-line no-restricted-globals
  location.href = 'index.html';
};
