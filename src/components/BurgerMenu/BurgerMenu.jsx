import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { CloseIcon, MenuIcon } from 'assets/images/header';

import { arrOfSection } from 'data';

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
    menuList,
    menuItem,
    menuLink,
    menuLinkActive,
} = styles;

export function BurgerMenu() {
    const [isMenuShown, setIsMenuShown] = useState(false);

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
                            <li className={menuItem}>
                                <NavLink
                                    className={({
                                        isActive,
                                        isPending,
                                        isTransitioning,
                                    }) =>
                                        [
                                            menuLink,
                                            isPending ? 'pending' : '',
                                            isActive ? menuLinkActive : '',
                                            isTransitioning
                                                ? 'transitioning'
                                                : '',
                                        ].join(' ')
                                    }
                                    to="/"
                                    onClick={handleMenuClick}
                                >
                                    Home
                                </NavLink>
                            </li>
                            {arrOfSection.map(title => (
                                <li key={title} className={menuItem}>
                                    <NavLink
                                        className={({
                                            isActive,
                                            isPending,
                                            isTransitioning,
                                        }) =>
                                            [
                                                menuLink,
                                                isPending ? 'pending' : '',
                                                isActive ? menuLinkActive : '',
                                                isTransitioning
                                                    ? 'transitioning'
                                                    : '',
                                            ].join(' ')
                                        }
                                        to={`/${title.toLowerCase()}`}
                                        onClick={handleMenuClick}
                                    >
                                        {title} Equipment
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
