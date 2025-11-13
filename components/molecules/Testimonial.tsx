import DOMPurify from 'dompurify';
import Image from 'next/image';

import { Testimonial } from 'store/master/types';

/**
 * Props interface for Testimonial component
 */
interface TestimonialProps {
  /** Testimonial data containing message, name, company, and image information */
  data: Testimonial;
}

/**
 * TestimonialComponent
 *
 * A responsive testimonial card component that displays customer feedback
 * with sanitized HTML content, profile photo, name, and company information.
 * Features responsive design and safe HTML rendering.
 */
const TestimonialComponent = ({ data }: TestimonialProps) => {
  // Validate required data to prevent runtime errors
  if (!data) {
    return null;
  }

  /** Sanitized testimonial message HTML content */
  const sanitizedMessage = DOMPurify.sanitize(data.message || '');

  /** Sanitized company information HTML content */
  const sanitizedCompany = DOMPurify.sanitize(data.company || '');

  /** Fallback alt text for profile image */
  const imageAlt = `${data.name || 'Customer'} profile photo`;

  return (
    <div className="c-testimonial">
      {/* Main testimonial message content */}
      <div className="c-testimonial__content" dangerouslySetInnerHTML={{ __html: sanitizedMessage }} />

      {/* Customer information section */}
      <div className="flex items-center">
        {/* Optimized customer profile image */}
        <Image
          src={data.image_url || '/static/images/default-avatar.png'}
          alt={imageAlt}
          className="c-testimonial__photo"
          width={60}
          height={60}
          priority={false}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyepckqfca9b8gZiLb7cHKSTg"
        />

        {/* Customer details */}
        <div>
          {/* Customer name */}
          <div className="c-testimonial__name">{data.name || 'Anonymous'}</div>

          {/* Customer company/title with sanitized HTML */}
          <div className="c-testimonial__instance" dangerouslySetInnerHTML={{ __html: sanitizedCompany }} />
        </div>
      </div>

      {/* Component-scoped styling with responsive design */}
      <style jsx>{`
        .c-testimonial {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          /* Testimonial message content styling */
          &__content {
            @apply w-full font-opensans text-sm italic text-dark-grey;
            line-height: 22px;
            opacity: 0.8;
            margin-top: 16px;
            margin-bottom: 34px;

            /* Responsive typography for larger screens */
            @screen md {
              @apply text-lg;
              margin-bottom: 48px;
              line-height: 28px;
            }
          }

          /* Customer profile photo styling */
          &__photo {
            @apply mr-3 text-xs;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: #efeef4;

            /* Larger photo on desktop */
            @screen md {
              width: 60px;
              height: 60px;
            }
          }

          /* Customer name styling */
          &__name {
            @apply text-xs font-semibold;
            line-height: 21px;
          }

          /* Customer company/title styling */
          &__instance {
            @apply text-xs;
            line-height: 21px;
            color: #898699;
          }
        }
      `}</style>

      {/* Global styles for rich text content */}
      <style jsx global>{`
        strong,
        a {
          @apply font-semibold;
        }
      `}</style>
    </div>
  );
};

export default TestimonialComponent;
