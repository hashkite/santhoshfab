import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useHeaderContext } from '../../../app/context/header';
import {
  getData,
  getNodeData,
  getTalentProfile,
  usedTransformedLocation,
} from '../../../shared/api';
import { Picture } from '../../elements';
import Button from '../../elements/button';
import NavBlock from '../../elements/nav-block';
// import { Logo } from '../../elements/svg';

import classNames from 'classnames';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSticky, useTopMenu } from 'shared/hooks';
import { LinkValidate, Mapper } from 'shared/ui';
import { USER_PAGE_PATH } from '../../../shared/config';
import HireButton from '../../elements/hire-popup/hire-button';
import './header.scss';

const Header = () => {
  const pathname = usedTransformedLocation();
  const isUserPage = pathname.includes(USER_PAGE_PATH);
  const useFetchData = isUserPage ? getTalentProfile : getNodeData;
  const { data: headerMenu } = getData('fetch/menu/main');
  const { data: contactUs } = getData('fetch/menu/contact-us');
  const { data: userMenu } = getData('fetch/menu/account');
  const { top_menu, isExist } = useTopMenu();
  const { data: node } = useFetchData(pathname);
  const avatar = node?.data?.user_image?.items?.[0] || null;
  const location = useLocation();
  const { isMenuOpen, setIsMenuOpen, toggleMenu } = useHeaderContext();
  const isSticky = useSticky();
  const headerRef = useRef();
  const headerTopRef = useRef();
  let link = null;

  if (contactUs?.data?.links) {
    if (pathname.includes('/managed-teams')) {
      link = contactUs.data.links.filter(link => link.path === '/hire-managed');
    } else if (pathname.includes('/services')) {
      link = contactUs.data.links.filter(
        link => link.path === '/hire-services'
      );
    } else link = contactUs.data.links.filter(link => link.path === '/hire');
  }

  useEffect(() => {
    setIsMenuOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useGSAP(
    () => {
      gsap.from(headerRef.current, {
        scale: 0.95,
        y: '-5vh',
        opacity: 0,
        ease: 'power1.out',
        duration: 1,
      });
    },
    { scope: headerRef }
  );

  useGSAP(
    () => {
      gsap.from(headerTopRef.current, {
        scale: 0.95,
        y: '-5vh',
        opacity: 0,
        ease: 'power1.out',
        duration: 1,
      });
    },
    { scope: headerTopRef }
  );

  return (
    <>
      <div ref={headerTopRef} className="navbar-top">
        <Mapper
          className="container"
          array={top_menu}
          children={LinkValidate}
        />
      </div>
      <div
        className={classNames(
          'header',
          isMenuOpen && 'active',
          isSticky && 'fixed',
          isExist && 'with-top-menu'
        )}
        ref={headerRef}
      >
        <div className="container">
          <div className="header__container">
            <div className="header__left">
              <Link to={'/'} className="header__logo">
                <LazyLoadImage
                  effect="blur"
                  src={'/media/logo.svg'}
                  alt="Santhosh Fabricators | Logo"
                  height="42px"
                  width="183px"
                />
              </Link>
              {headerMenu?.data?.links && (
                <NavBlock items={headerMenu?.data?.links} />
              )}
            </div>
            <div className="header__right">
              <HireButton />
              {userMenu?.data?.is_logged_in && (
                <div className="account-menu">
                  <div className="account-menu__icon">
                    <a href="/user">
                      {(avatar && (
                        <Picture className="image" image={avatar} />
                      )) || (
                        <img
                          alt="User account"
                          width={25}
                          height={'auto'}
                          className="icon"
                          src="/media/icons/user.svg"
                        />
                      )}
                    </a>
                  </div>
                  <div className="account-menu__items">
                    {userMenu?.data?.links?.map((item, index) => (
                      <a key={index} href={item.path}>
                        {item.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              <Button
                onClick={() => toggleMenu()}
                className={`btn btn-burger ${isMenuOpen ? 'active' : ''}`}
                aria-label="Toggle menu"
                aria-expanded="true"
              >
                <i className="icon-burger" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
