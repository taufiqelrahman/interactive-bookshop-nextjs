import Toggle from 'components/atoms/Toggle';
import { i18n } from 'i18n';
import { useEffect, useState } from 'react';

const TranslationToggle = (props: any) => {
  const [isEnglish, setEnglish] = useState(true);

  const changeLanguage = () => {
    i18n.changeLanguage(isEnglish ? 'id' : 'en');
    setEnglish(!isEnglish);
  };

  useEffect(() => {
    setEnglish(i18n.language === 'en');
  }, []);

  return (
    <div style={props.style}>
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
            color: ${props.white ? 'white' : '#898699'};
            -webkit-transition: 0.4s;
            transition: 0.4s;

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
