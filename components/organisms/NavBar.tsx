import Link from 'next/link';
import { ShoppingCart } from 'react-feather';
import { useState, useRef, useEffect } from 'react';

const NavBar = () => {
  const [isSticky, setSticky] = useState(false);
  const menu = [
    { text: 'About', path: '/about'},
    { text: 'Books', path: '/books'},
  ];
  const ref = useRef<HTMLInputElement>(null);
  const handleScroll = () => {
    if(ref && ref.current) {
      setSticky(ref.current.getBoundingClientRect().top <= 0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  const stickyClassName = () => {
    return isSticky ? 'c-nav-bar--sticky' : '';
  }

  return (
    <div>
      <div className={stickyClassName()} ref={ref}>
        <div className="c-nav-bar">
        <div className="u-container">
          <Link href="/">
            <a className="c-nav-bar__logo">
              whenigrowup
            </a>
          </Link>
          <div className="c-nav-bar__menu">
            { menu.map((menu, i) => {
              return (
                <Link key={i} href={menu.path}>
                  <a className="c-nav-bar__menu__item">
                    {menu.text}
                  </a>
                </Link>
              )
            })}
            <Link href="/cart">
              <a className="c-nav-bar__menu__item c-nav-bar__menu__cart">
                <div className="c-nav-bar__menu__icon">
                  <ShoppingCart color="#4a5568" />
                </div>
                Cart
              </a>
            </Link>
          </div>
        </div>
      </div>
      </div>
      <style jsx>{`
        .c-nav-bar {
          .c-nav-bar--sticky & {
            @apply fixed top-0 inset-x-0 bg-white;
          }

          &__logo {
            @apply p-4 font-bold text-lg text-red-600;
          }

          &__menu {
            @apply flex items-center text-gray-700;
            &__item {
              @apply p-4 font-bold;
            }
            &__cart {
              @apply flex items-center;
            }
            &__icon {
              @apply mr-2;
            }
          }

          &--sticky {
            @apply sticky top-0;
          }
        }
      `}
      </style>
    </div>
  )
};

export default NavBar;