
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useIntl } from 'react-intl';
import { changeLanguage } from '../languageProvider/LanguageProvider';


export default function LanguageSelector() {
    const { formatMessage } = useIntl();


    return (
        <div>
            <button onClick={() => changeLanguage('en')}>
                {formatMessage({ id: 'english' })}
            </button>
            <button onClick={() => changeLanguage('es')}>
                {formatMessage({ id: 'spanish' })}
            </button>
        </div>
    )
}
