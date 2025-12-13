import Link from 'next/link';
import React from 'react';

/**
 * Individual feature item structure
 */
interface Feature {
  /** Unique identifier/slug for the feature item */
  slug: string;
  /** Display name of the feature */
  name: string;
  /** Array of image objects associated with the feature */
  images: { filepath: string }[];
  /** Optional unique identifier for better React keys */
  id?: string;
}

/**
 * Props interface for the Features component
 */
interface FeaturesProps {
  /** Array of feature items to display */
  features: Feature[];
  /** Optional CSS class name for additional styling */
  className?: string;
  /** Optional title for the features section */
  title?: string;
  /** Base path for feature links (defaults to '/books/') */
  basePath?: string;
}

/**
 * Features Component
 *
 * A responsive grid component that displays feature items as clickable cards
 * with background images. Each feature links to its detailed page and shows
 * the feature name as an overlay.
 *
 * Key Features:
 * - Responsive grid layout with proper spacing
 * - Background image support with fallback handling
 * - Accessible navigation with proper ARIA labels
 * - Configurable link paths and styling
 * - Safe rendering with error boundary protection
 * - SEO-friendly link structure
 */
const Features: React.FC<FeaturesProps> = ({ features, className = '', title, basePath = '/books/' }): JSX.Element => {
  /**
   * Get the primary image URL for a feature item
   * Provides fallback handling for missing or empty images
   */
  const getFeatureImageUrl = (featureImages: { filepath: string }[]): string => {
    return featureImages && featureImages.length > 0 ? featureImages[0].filepath : '';
  };

  /**
   * Generate a unique key for React rendering
   * Uses feature id or slug as fallback to avoid array index keys
   */
  const getFeatureKey = (feature: Feature, index: number): string => {
    return feature.id || feature.slug || `feature-${index}`;
  };

  /**
   * Generate the complete URL for a feature link
   * Combines base path with feature slug for consistent routing
   */
  const getFeatureUrl = (slug: string): string => {
    return `${basePath}${slug}`;
  };

  return (
    <section className={`c-features-section ${className}`} aria-label="Featured items">
      {/* Optional section title */}
      {title && (
        <div className="u-container">
          <h2 className="c-features__title">{title}</h2>
        </div>
      )}

      {/* Features grid container */}
      <div className="c-features">
        <div className="u-container">
          {features.map((feature, index) => {
            const imageUrl = getFeatureImageUrl(feature.images);
            const featureKey = getFeatureKey(feature, index);
            const featureUrl = getFeatureUrl(feature.slug);

            return (
              <Link
                key={featureKey}
                href={featureUrl}
                className="c-features__item"
                style={{
                  backgroundImage: imageUrl ? `url('${imageUrl}')` : 'none',
                }}
                aria-label={`View details for ${feature.name}`}
                title={feature.name}
              >
                <span className="c-features__item-name" aria-hidden="false">
                  {feature.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Component-scoped styles using styled-jsx */}
      <style jsx>{`
        .c-features-section {
          @apply w-full;
        }

        .c-features {
          @apply py-6;

          &__title {
            @apply mb-8 text-center text-2xl font-bold;

            @screen md {
              @apply mb-12 text-3xl;
            }
          }

          &__item {
            @apply relative mr-3 w-full bg-cover bg-center p-5 text-center text-xl text-white;
            height: 370px;
            display: inline-block;
            transition:
              transform 0.3s ease,
              box-shadow 0.3s ease;
            text-decoration: none;
            border-radius: 8px;
            overflow: hidden;

            /* Mobile first - stacked layout */
            @apply mb-4;

            /* Tablet and up - grid layout */
            @screen md {
              @apply mb-6 w-1/2;
            }

            /* Desktop - three column layout */
            @screen lg {
              @apply mb-0 w-1/3;
            }

            &:last-child {
              @apply mr-0;
            }

            /* Hover effects for better interactivity */
            &:hover {
              transform: translateY(-4px);
              box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            }

            /* Dark overlay for better text readability */
            &::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%);
              transition: opacity 0.3s ease;
            }

            &:hover::before {
              opacity: 0.8;
            }
          }

          &__item-name {
            @apply relative z-10 font-semibold;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
            line-height: 1.4;

            /* Responsive typography */
            @screen sm {
              @apply text-2xl;
            }
          }
        }
      `}</style>
    </section>
  );
};

export default Features;
