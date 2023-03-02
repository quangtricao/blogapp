let token = null;
const STORAGE_KEY = "loggedBlogAppUser";

const setUserToLocalStorage = (user) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  token = user.token;
};

const getUserFromLocalStorage = () => {
  const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY);
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    token = user.token;
    return user;
  }

  return null;
};

const clearUserFromLocalStorage = () => {
  localStorage.clear();
  token = null;
};

const getToken = () => token;

export default {
  setUserToLocalStorage,
  getUserFromLocalStorage,
  clearUserFromLocalStorage,
  getToken,
};
