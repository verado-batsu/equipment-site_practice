import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';

import { UserMenu } from 'components/UserMenu/UserMenu';

import { CloseIcon, MenuIcon } from 'assets/images/header';

import { arrOfAuthTitle, arrOfHeaderSection } from 'constants';
import { findRightPath } from 'helpers';

import styles from './BurgerMenu.module.scss';
const {
    headerMenu,
    menuBtn,
    menuIcon,
    menuBody,
    menuBodyActive,
    menuContainer,
    menuBox,
    menuBoxActive,
    closeBtn,
    closeBtnText,
    closeIcon,
    authList,
    authItem,
    authLink,
    menuList,
    menuItem,
    menuLink,
    menuLinkActive,
} = styles;

export function BurgerMenu() {
    const [isMenuShown, setIsMenuShown] = useState(false);

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    const isDesktop = useMediaQuery({ minWidth: 1440 });

    useEffect(() => {
        if (!isDesktop) {
            return;
        }

        function handleEscClick(e) {
            if (e.key === 'Escape') {
                setIsMenuShown(false);
                document.body.classList.remove('_lock');
            }
        }

        window.addEventListener('keydown', handleEscClick);

        return () => {
            window.removeEventListener('keydown', handleEscClick);
        };
    }, [isDesktop]);

    function handleMenuClick(e) {
        setIsMenuShown(prev => !prev);
        document.body.classList.toggle('_lock');
    }

    function handleMenuBodyClick(e) {
        const currClass = e.target.classList[0];
        if (currClass === menuBody || currClass === menuContainer) {
            setIsMenuShown(false);
            document.body.classList.remove('_lock');
        }
    }

    return (
        <div className={headerMenu}>
            <button
                aria-label="open burger menu"
                type="button"
                onClick={handleMenuClick}
                className={menuBtn}
            >
                <MenuIcon className={menuIcon} />
            </button>
            <nav
                className={
                    isMenuShown
                        ? `${menuBody} ${menuBodyActive}`
                        : `${menuBody}`
                }
                onClick={handleMenuBodyClick}
            >
                <div className={`${menuContainer} container`}>
                    <div
                        className={
                            isMenuShown
                                ? `${menuBox} ${menuBoxActive}`
                                : menuBox
                        }
                    >
                        <button
                            type="button"
                            onClick={handleMenuClick}
                            className={closeBtn}
                        >
                            <CloseIcon className={closeIcon} />
                            <span className={closeBtnText}>close</span>
                        </button>
                        <ul className={menuList}>
                            {arrOfHeaderSection.map(title => {
                                return (
                                    <li key={title} className={menuItem}>
                                        <NavLink
                                            className={({ isActive }) =>
                                                [
                                                    menuLink,
                                                    isActive
                                                        ? menuLinkActive
                                                        : '',
                                                ].join(' ')
                                            }
                                            to={findRightPath(title)}
                                            onClick={handleMenuClick}
                                        >
                                            {title}
                                        </NavLink>
                                    </li>
                                );
                            })}
                        </ul>
                        {isLoggedIn ? (
                            <UserMenu />
                        ) : (
                            <ul className={authList}>
                                {arrOfAuthTitle.map(title => (
                                    <li key={title} className={authItem}>
                                        <Link
                                            className={authLink}
                                            to={`/${title.toLowerCase()}`}
                                            onClick={handleMenuClick}
                                        >
                                            {title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
