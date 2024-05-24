import { Outlet } from 'react-router-dom';

import { Header } from 'components/Header/Header';

export function SharedLayout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}
