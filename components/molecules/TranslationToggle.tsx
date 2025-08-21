import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Toggle from 'components/atoms/Toggle';
import { i18n } from 'i18n';
import * as gtag from 'lib/gtag';

const TranslationToggle = (props: any) => {
  const router = useRouter();
  const isIndexPage = router.pathname === '/';
  const [isEnglish, setEnglish] = useState(true);

  const changeLanguage = () => {
    const lang = isEnglish ? 'id' : 'en';
    i18n.changeLanguage(lang);
    gtag.event({
      action: 'toggle_lang',
      category: 'engagement',
      label: lang,
    });
    setEnglish(!isEnglish);
  };

  useEffect(() => {
    setEnglish(i18n.language === 'en');
  }, []);

  return (
    <div style={props.style}>
      <Toggle
        value={isEnglish}
        onChange={changeLanguage}
        style={isIndexPage && !props.isSticky ? { borderColor: '#333' } : {}}
      >
        <div className="c-translate">
          <div className={`c-translate__option ${isEnglish ? '' : 'active'}`}>ID</div>
          <div className={`c-translate__option ${isEnglish ? 'active' : ''}`}>EN</div>
        </div>
      </Toggle>
      <style jsx>{`
        .c-translate {
          @apply relative z-10 flex h-full items-center text-xs font-semibold;
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
