import axios from 'axios';

/************/
/***CONSTS***/
/************/

//constantes utilisées dans toute l'application

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


/*********/
/***API***/
/*********/

const API_URL = 'https://back.love-letter.ludovic-muller.fr/';

//exemple
// export const getData() {
//     const url = `${API_URL}/something`;
//     return axios.get(url).then(response => response.data);
// }
