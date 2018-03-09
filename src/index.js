import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/****************************/
/****Internationalization****/
/****************************/

import { IntlProvider, addLocaleData } from 'react-intl';

import messages from './messages';

import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';

import { flattenMessages } from './utils'

addLocaleData([...en, ...fr]);

let locale =
    (navigator.languages && navigator.languages[0])
    || navigator.language
    || navigator.userLanguage
    || 'fr-FR';

/***********/
/****App****/
/***********/

ReactDOM.render(
    <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}>
        <App />
    </IntlProvider>,
    document.getElementById('root')
);
