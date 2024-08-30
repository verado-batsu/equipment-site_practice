import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export function RestrictedRoute({ component: Component, redirectTo = '/' }) {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
}
