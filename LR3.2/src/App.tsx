import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [count, setCount] = useState<number>(0);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <div className="container">
      <div className="btn-group">
        <button 
          className={`btn ${i18n.language === 'en' ? 'btn-primary' : 'btn-outline-primary'}`} 
          onClick={() => changeLanguage('en')}
        >
          English
        </button>
        <button 
          className={`btn ${i18n.language === 'ru' ? 'btn-primary' : 'btn-outline-primary'}`} 
          onClick={() => changeLanguage('ru')}
        >
          Русский
        </button>
      </div>

      <button className="btn btn-info" onClick={() => setCount(count + 1)}>
        {t('clicks', { count })}
      </button>

      <button className="btn btn-warning" onClick={() => setCount(0)}>
        {t('reset')}
      </button>
    </div>
  );
};

export default App;

