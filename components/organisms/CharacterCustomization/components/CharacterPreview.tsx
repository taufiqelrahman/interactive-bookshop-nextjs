import Image from 'next/image';

interface CharacterPreviewProps {
  className?: string;
  isMobile?: boolean;
}

export const CharacterPreview: React.FC<CharacterPreviewProps> = ({ className = '', isMobile = false }) => {
  if (isMobile) {
    return (
      <div className="u-container c-char-custom__preview">
        <div>
          <Image
            id="preview-char"
            src="/static/images/empty.png"
            alt="character preview"
            width={200}
            height={200}
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="c-char-custom__char">
        <Image
          id="preview-char"
          src="/static/images/empty.png"
          alt="character preview"
          width={200}
          height={200}
          priority
        />
      </div>
    </div>
  );
};
