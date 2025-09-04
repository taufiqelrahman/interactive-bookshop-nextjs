import { BookPage } from 'store/master/types';

interface ProcessBookPageContentArgs {
  currentContent: BookPage;
  language: string;
  contents: BookPageContent[];
  name?: string;
  gender?: string;
  dedication?: string;
}

/**
 * Process and personalize book page content string based on language, name, gender, and dedication.
 */

/**
 * Process and personalize book page content string based on language, name, gender, and dedication.
 * - Replaces [name] and [child*] placeholders with personalized values.
 * - Handles special cases for Front Cover and Back Cover.
 */
export function processBookPageContent(args: ProcessBookPageContentArgs): string {
  const { currentContent, language, contents, name, gender, dedication } = args;

  // Determine language and get the base content string
  const isEnglish = language === 'english';
  let processed = isEnglish ? currentContent.englishText : currentContent.indonesiaText;

  // Get the first content block for special cover logic
  const [firstContent] = contents;

  // If no name, return the base processed string
  if (!name) return processed;

  // Replace [name] placeholder
  if (firstContent.occupation.name === 'Front Cover') {
    // On front cover, use uppercase name
    processed = processed.split('[name]').join((name || '').toUpperCase());
  } else {
    // Else, capitalize only the first letter
    processed = processed.split('[name]').join(name.replace(/^./, name[0].toUpperCase()));
  }

  // Replace [child*] placeholders for English
  if (isEnglish) {
    const isBoy = gender === 'boy';
    processed = processed.split('[child]').join(isBoy ? 'boy' : 'girl');
    processed = processed.split('[child:1]').join(isBoy ? 'he' : 'she');
    processed = processed.split('[child:2]').join(isBoy ? 'his' : 'her');
    processed = processed.split('[child:3]').join(isBoy ? 'him' : 'her');
  }

  // If Back Cover, use dedication text
  if (firstContent.occupation.name === 'Back Cover') {
    processed = dedication;
  }

  return processed;
}

interface BookPageContent {
  occupation: { name: string };
  [key: string]: any;
}

interface BookPageStyleArgs {
  styleString?: string;
  isMobile?: boolean;
  isWhiteCover?: boolean;
  name?: string;
  contents: BookPageContent[];
}

/**
 * Generate dynamic style for book page content based on props and optional style string.
 * @param args BookPageStyleArgs
 */
export function getBookPageStyle(args: BookPageStyleArgs): React.CSSProperties {
  const { styleString, isMobile, isWhiteCover, name, contents } = args;
  // Base style
  let style: React.CSSProperties = {
    width: '37%',
    fontSize: isMobile ? '2vw' : '0.8vw',
    lineHeight: isMobile ? '2.5vw' : '1vw',
    fontFamily: 'Jost',
    textAlign: 'center',
    fontWeight: 300,
  };

  // Merge in style overrides from JSON string if provided
  if (styleString) {
    try {
      style = { ...style, ...JSON.parse(styleString) };
    } catch {
      // Ignore parse errors and use base style
    }
  }

  // Apply mobile-specific overrides if present in style
  if (isMobile) {
    if ((style as any).fontSizeMobile) style.fontSize = (style as any).fontSizeMobile;
    if ((style as any).lineHeightMobile) style.lineHeight = (style as any).lineHeightMobile;
    if ((style as any).widthMobile) style.width = (style as any).widthMobile;
  }

  // If white cover, force text color to black
  if (isWhiteCover) {
    style = { ...style, color: 'black' };
  }

  // Special handling for Front Cover page
  const [firstContent] = contents;
  if (firstContent && firstContent.occupation.name === 'Front Cover') {
    style = {
      ...style,
      fontSize: isMobile ? '9vw' : '3.5vw',
      lineHeight: isMobile ? '7.5vw' : '3vw',
    };
    // If name is long, adjust width and margins for better fit
    if (name && name.length > 4) {
      style = {
        ...style,
        width: '90%',
        left: '15%',
        marginLeft: '-10%',
        marginRight: '-10%',
      };
    }
  }

  return style;
}

/**
 * Calculate the height of the book preview area based on window size and book aspect ratio.
 * - Uses a different width calculation for desktop vs mobile/tablet.
 * - Applies a fixed padding and a fixed book aspect ratio.
 * - Returns the calculated height for a single book page.
 */
export const calcHeight = (): number => {
  // Determine the container width: 75% for desktop, ~92% for mobile/tablet
  const isDesktop = window.innerWidth > 1023;
  const containerWidth = isDesktop ? window.innerWidth * 0.75 : (window.innerWidth * 11) / 12;

  // Padding to subtract from total width (e.g., for margins)
  const padding = 60;

  // Book aspect ratio: width/height = 495/700
  const bookRatio = 495 / 700;

  // Calculate the height for one page (container is split in half for two pages)
  const availableWidth = (containerWidth - padding) / 2;
  const height = availableWidth * bookRatio;
  return height;
};
