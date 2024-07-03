// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import messages_en from '../../../translations/en.json'
import messages_es from '../../../translations/es.json'

const messages = {
  en: messages_en,
  es: messages_es,
};

// eslint-disable-next-line react-refresh/only-export-components
export const changeLanguage = (selectedLocale) => {
  localStorage.setItem('locale', selectedLocale); // Store selected locale in local storage
  window.location.reload()
};


// Define a functional component called LanguageProvider
const LanguageProvider = ({ children }) => {
  
  // Define state variable 'locale' and a function to set it
  // eslint-disable-next-line no-unused-vars
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'es');


  
  // Render IntlProvider component with locale and messages based on current locale
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>

      {children}
    </IntlProvider>
  );
};

export default LanguageProvider;