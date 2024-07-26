import { NavLink } from 'react-router-dom';

import { arrOfHeaderSection } from 'constants';

import styles from './Navigation.module.scss';
const { navigation, navList, navItem, navLink, navLinkActive } = styles;

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
                            to={`/${title.toLowerCase()}`}
                        >
                            {title} Equipment
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
