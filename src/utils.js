import axios from 'axios';

/************/
/***CONSTS***/
/************/

//constantes utilisées dans toute l'application
export const mailRegex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

/**********/
/***I18N***/
/**********/

//allow a nested structure in messages.js
export const flattenMessages = ((nestedMessages, prefix = '') => {
    if (nestedMessages == null) {
        return {}
    }

    return Object.keys(nestedMessages).reduce((messages, key) => {
        let value       = nestedMessages[key];
        let prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'string') {
            messages[prefixedKey] = value;
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey));
        }

        return messages;
    }, {})
})


/*************/
/***STORAGE***/
/*************/

const register = () => {
    window.location.replace('/login');
}


// const login = (token) => {
//     localStorage.setItem('token', token);
//     window.location.replace('/');
// }


/*********/
/***API***/
/*********/

const API_URL = 'https://back.love-letter.ludovic-muller.fr/api';
const HEADERS = {'Content-Type': 'application/x-www-form-urlencoded'};

export const api_register = (name, password, email) => {
    const url = `${API_URL}/register`;

    const data = new FormData();
    data.append('name', name);
    data.append('password', password);
    data.append('email', email);

    axios.post(url, data, {headers: HEADERS})
    .then(function (response) {
        console.log(response);

        if(data.success) {
            register();

        } else {
            throw 'error';
            //gestion erreur
        }

    })
    .catch(function (error) {
        console.log(error);
        //retourner un message d'erreur quelconque
    });
}