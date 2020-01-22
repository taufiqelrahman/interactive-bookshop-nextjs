import Toggle from 'components/atoms/Toggle';
import { i18n } from 'i18n';
import { useEffect, useState } from 'react';

const TranslationToggle = () => {
  const [isEnglish, setEnglish] = useState(true);

  const changeLanguage = () => {
    i18n.changeLanguage(isEnglish ? 'id' : 'en');
    setEnglish(!isEnglish);
  };

  useEffect(() => {
    setEnglish(i18n.language === 'en');
  }, []);

  return (
    <div>
      <Toggle value={isEnglish} onChange={changeLanguage}>
        <div className="c-translate">
          <div className={`c-translate__option ${isEnglish ? '' : 'active'}`}>ID</div>
          <div className={`c-translate__option ${isEnglish ? 'active' : ''}`}>EN</div>
        </div>
      </Toggle>
      <style jsx>{`
        .c-translate {
          @apply flex items-center h-full relative z-10 font-semibold text-xs;
          &__option {
            @apply w-2/4 text-center;
            line-height: 20px;
            color: #898699;

            &.active {
              @apply text-white;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default TranslationToggle;
