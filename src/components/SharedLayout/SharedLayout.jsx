import { Link, NavLink, Outlet } from 'react-router-dom';

import styles from './SharedLayout.module.scss';
const { header } = styles;

export function SharedLayout() {
    return (
        <>
            <header className={header}>
                <div className="container">
                    <Link to="/">KMIT</Link>
                    <nav>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/rolling">Rolling Equipment</NavLink>
                        <NavLink to="/drawing">Drawing Equipment</NavLink>
                        <NavLink to="/pressing">Pressing Equipment</NavLink>
                        <NavLink to="/forging">Forging Equipment</NavLink>
                        <NavLink to="/stamping">Stamping Equipment</NavLink>
                    </nav>
                </div>
            </header>
            <Outlet />
        </>
    );
}
