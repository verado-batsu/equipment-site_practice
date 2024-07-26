import { Link, NavLink } from 'react-router-dom';

import { arrOfHeaderSection, arrOfAuthTitle } from 'constants';

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
    return (
        <nav className={navigation}>
            <ul className={navList}>
                {arrOfHeaderSection.map(title => (
                    <li key={title} className={navItem}>
                        <NavLink
                            className={({ isActive }) =>
                                [navLink, isActive ? navLinkActive : ''].join(
                                    ' '
                                )
                            }
                            to={
                                title === 'Home'
                                    ? '/'
                                    : `/${title.toLowerCase()}`
                            }
                        >
                            {title}
                        </NavLink>
                    </li>
                ))}
            </ul>
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
        </nav>
    );
}
