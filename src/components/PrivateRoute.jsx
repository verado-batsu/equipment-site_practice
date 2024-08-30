import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export function PrivateRoute({ component: Component, redirectTo = '/' }) {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    return isLoggedIn ? Component : <Navigate to={redirectTo} />;
}
