import { NavLink } from 'react-router-dom';

import { arrOfSection } from 'data';

import styles from './Navigation.module.scss';
const { navigation, navList, navItem, navLink, navLinkActive } = styles;

export function Navigation() {
    return (
        <nav className={navigation}>
            <ul className={navList}>
                {/* <li className={navItem}>
                    <NavLink
                        className={({ isActive, isPending, isTransitioning }) =>
                            [
                                navLink,
                                isPending ? 'pending' : '',
                                isActive ? navLinkActive : '',
                                isTransitioning ? 'transitioning' : '',
                            ].join(' ')
                        }
                        to="/"
                    >
                        Home
                    </NavLink>
                </li> */}
                {arrOfSection.map(title => (
                    <li key={title} className={navItem}>
                        <NavLink
                            className={({
                                isActive,
                                isPending,
                                isTransitioning,
                            }) =>
                                [
                                    navLink,
                                    isPending ? 'pending' : '',
                                    isActive ? navLinkActive : '',
                                    isTransitioning ? 'transitioning' : '',
                                ].join(' ')
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
