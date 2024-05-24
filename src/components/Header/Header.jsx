import { Link } from 'react-router-dom';

import { BurgerMenu } from 'components/BurgerMenu/BurgerMenu';

import styles from './Header.module.scss';
const { header, headerBody, headerLogoLink } = styles;

export function Header() {
    return (
        <header className={header}>
            <div className="container">
                <div className={headerBody}>
                    <Link className={headerLogoLink} to="/">
                        KMIT
                    </Link>
                    <BurgerMenu />
                </div>
            </div>
        </header>
    );
}
