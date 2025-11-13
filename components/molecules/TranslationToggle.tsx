import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useCallback, useEffect, useState } from 'react';

import Toggle from 'components/atoms/Toggle';
import * as gtag from 'lib/gtag';

/**
 * Props interface for TranslationToggle component
 */
interface TranslationToggleProps {
  /** Custom CSS styles to apply to the component wrapper */
  style?: React.CSSProperties;
  /** Whether the toggle is in sticky navigation mode */
  isSticky?: boolean;
  /** Whether to use white text color theme */
  white?: boolean;
  /** Additional props that can be passed to the component */
  [key: string]: unknown;
}

/**
 * Supported language codes for translation
 */
type LanguageCode = 'en' | 'id';

/**
 * TranslationToggle Component
 *
 * A responsive language toggle component that allows users to switch between
 * English and Indonesian languages. Features analytics tracking and responsive
 * styling based on navigation state.
 */
const TranslationToggle: React.FC<TranslationToggleProps> = (props) => {
  const router = useRouter();
  const { i18n } = useTranslation();

  /** Whether the current page is the index/home page */
  const isIndexPage = router.pathname === '/';

  /** Current language state - true for English, false for Indonesian */
  const [isEnglish, setEnglish] = useState(true);

  /**
   * Handles language change toggle with analytics tracking
   * Switches between English ('en') and Indonesian ('id')
   */
  const changeLanguage = useCallback(() => {
    const newLang: LanguageCode = isEnglish ? 'id' : 'en';

    // Change language in i18n system
    i18n.changeLanguage(newLang);

    // Track language toggle event for analytics
    gtag.event({
      action: 'toggle_lang',
      category: 'engagement',
      label: newLang,
    });

    // Update local state
    setEnglish(!isEnglish);
  }, [isEnglish, i18n]);

  /**
   * Synchronize component state with i18n language on mount and language changes
   */
  useEffect(() => {
    setEnglish(i18n.language === 'en');
  }, [i18n.language]);

  /**
   * Dynamic styling for toggle border based on page context
   * Dark border on index page when not sticky, default otherwise
   */
  const toggleStyle = isIndexPage && !props.isSticky ? { borderColor: '#333' } : {};

  return (
    <div style={props.style}>
      <Toggle value={isEnglish} onChange={changeLanguage} style={toggleStyle}>
        <div className="c-translate">
          {/* Indonesian language option - active when English is false */}
          <div className={`c-translate__option ${isEnglish ? '' : 'active'}`}>ID</div>
          {/* English language option - active when English is true */}
          <div className={`c-translate__option ${isEnglish ? 'active' : ''}`}>EN</div>
        </div>
      </Toggle>
      {/* Styled JSX for component-scoped styling */}
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
