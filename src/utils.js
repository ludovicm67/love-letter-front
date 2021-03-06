import axios from 'axios';
import Echo from 'laravel-echo';

/************/
/***CONSTS***/
/************/

// constantes utilisées dans toute l'application
export const mailRegex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

//styles (pour l'instant constantes, à terme variables)
export const colors = {
  blackColor: '#505157', //gris foncé
  lightMainColor: '#5EACC6', //bleu clair
  darkMainColor: '#227A94', //bleu-vert
  secondColor: '#A693E3', //violet pâle
  whiteColor: '#F5EFFF', //blanc
};

/**********/
/***I18N***/
/**********/

// allow a nested structure in messages.js
export const flattenMessages = (nestedMessages, prefix = '') => {
  if (nestedMessages == null) {
    return {};
  }

  return Object.keys(nestedMessages).reduce((messages, key) => {
    let value = nestedMessages[key];
    let prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
};

export const getLanguage = () => {
  let locale =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage ||
    'fr';

  //ignore region code & set french to default language
  if (locale.substring(0, 2) === 'en') {
    locale = 'en';
  } else {
    locale = 'fr';
  }

  return locale;
};

/*************/
/***STORAGE***/
/*************/

const login = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('name', user.name);
  localStorage.setItem('points', user.points);
  window.location.replace('/');
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  localStorage.removeItem('points');
  window.location.replace('/login');
};

/*********/
/***API***/
/*********/

export const API_URL = process.env.REACT_APP_API_URL;
const HEADERS = { 'Content-Type': 'application/x-www-form-urlencoded' };

export const api_register = (name, password) => {
  const url = `${API_URL}/register`;

  const data = new FormData();
  data.append('name', name);
  data.append('password', password);

  axios
    .post(url, data, { headers: HEADERS })
    .then(response => {
      if (response.data.success) {
        login(response.data.data.token, response.data.data.user);
      } else {
        // @TODO: add error message for the user
        console.log('ERROR:', response.data.error);
      }
    })
    .catch(error => {
      // @TODO: add error message for the user
      console.log(error);
    });
};

export const api_login = (name, password) => {
  const url = `${API_URL}/login`;

  const data = new FormData();
  data.append('name', name);
  data.append('password', password);

  axios
    .post(url, data, { headers: HEADERS })
    .then(response => {
      if (response.data.success) {
        login(response.data.data.token, response.data.data.user);
        console.log(response.data);
      } else {
        // @TODO: add error message for the user
        console.log('ERROR:', response.data.error);
      }
    })
    .catch(error => {
      // @TODO: add error message for the user
      console.log(error);
    });
};

export const api_logout = () => {
  const url = `${API_URL}/logout?token=${localStorage.getItem('token')}`;
  axios
    .get(url)
    .then(logout)
    .catch(logout);
};

export const api_refresh = () => {
  const url = `${API_URL}/me?token=${localStorage.getItem('token')}`;

  axios
    .get(url)
    .then(response => {
      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('name', response.data.data.user.name);
        localStorage.setItem('points', response.data.data.user.points);
      } else {
        console.log('ERROR:', response.data.error);
        window.location.replace('/login');
      }
    })
    .catch(error => {
      console.log(error);
      window.location.replace('/login');
    });
};

export const echo = new Echo({
  broadcaster: 'socket.io',
  host: process.env.REACT_APP_SOCK_URL.replace(/^(https?)?:\/\//, ''),
});
