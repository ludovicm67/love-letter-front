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

import { flattenMessages, echo } from './utils';

addLocaleData([...en, ...fr]);

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



// test with Laravel Echo
echo.channel('channel-test').listen('TestEvent', function(e) {
  console.log('TestEvent', e);
});



/***********/
/****App****/
/***********/

ReactDOM.render(
  <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}>
    <App />
  </IntlProvider>,
  document.getElementById('root')
);
