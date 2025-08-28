import React from 'react';

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
