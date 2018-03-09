import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


/****************************/
/****Internationalization****/
/****************************/

import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import de from 'react-intl/locale-data/de';

//import des chaînes traduites
import localeData from './build/locales/data.json';

addLocaleData([...en, ...de, ...fr]);

const language = (navigator.languages && navigator.languages[0]) ||
                     navigator.language ||
                     navigator.userLanguage;

const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.fr;


ReactDOM.render(
    <IntlProvider locale={language} messages={messages}>
        <App />
    </IntlProvider>,
    document.getElementById('root')
);
