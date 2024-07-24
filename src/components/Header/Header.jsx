import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { BurgerMenu } from 'components/BurgerMenu/BurgerMenu';
import { Navigation } from 'components/Navigation/Navigation';

import styles from './Header.module.scss';
const { header, headerBody, headerNavigationWrapper, headerLogoLink } = styles;

export function Header() {
    const isBurgerShown = useMediaQuery({
        query: `(max-width: 1439px)`,
    });

    return (
        <header className={header}>
            <div className="container">
                <div className={headerBody}>
                    <div className={headerNavigationWrapper}>
                        <Link className={headerLogoLink} to="/">
                            KMIT
                        </Link>
                        {!isBurgerShown && <Navigation />}
                    </div>
                    {isBurgerShown && <BurgerMenu />}
                </div>
            </div>
        </header>
    );
}
