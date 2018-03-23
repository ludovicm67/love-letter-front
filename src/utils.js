import axios from 'axios';

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
    whiteColor: '#F5EFFF' //blanc
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

/*************/
/***STORAGE***/
/*************/

const login = token => {
  localStorage.setItem('token', token);
  window.location.replace('/');
};

/*********/
/***API***/
/*********/

const API_URL = 'https://back.love-letter.ludovic-muller.fr/api';
const HEADERS = { 'Content-Type': 'application/x-www-form-urlencoded' };

export const api_register = (name, password, email) => {
  const url = `${API_URL}/register`;

  const data = new FormData();
  data.append('name', name);
  data.append('password', password);
  data.append('email', email);

  axios
    .post(url, data, { headers: HEADERS })
    .then(function(response) {
      console.log(response.data.success);

      if (response.data.success) {
        login(response.data.data.token);
      } else {
        console.log('ERROR:', response.data.error);
        //     //throw 'error';
        //     //gestion erreur
      }
    })
    .catch(function(error) {
      console.log(error);
      //retourner un message d'erreur quelconque
    });
};

export const api_login = (email, password) => {
  const url = `${API_URL}/login`;

  const data = new FormData();
  data.append('email', email);
  data.append('password', password);

  axios
    .post(url, data, { headers: HEADERS })
    .then(response => {
      if (response.data.success) {
        login(response.data.data.token);
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
