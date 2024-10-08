import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { UserMenu } from 'components/UserMenu/UserMenu';

import { arrOfHeaderSection, arrOfAuthTitle } from 'constants';
import { findRightPath } from 'helpers';

import styles from './Navigation.module.scss';
const {
    navigation,
    navList,
    navItem,
    navLink,
    navLinkActive,
    authList,
    authItem,
    authLink,
} = styles;

export function Navigation() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    return (
        <nav className={navigation}>
            <ul className={navList}>
                {arrOfHeaderSection.map(title => {
                    if (title === 'Create Equipment' && !isLoggedIn) {
                        return '';
                    }
                    return (
                        <li key={title} className={navItem}>
                            <NavLink
                                className={({ isActive }) =>
                                    [
                                        navLink,
                                        isActive ? navLinkActive : '',
                                    ].join(' ')
                                }
                                to={findRightPath(title)}
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
                            >
                                {title}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
}
