import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

import { logOut } from '../../redux/users/usersOperations';

import styles from './UserMenu.module.scss';
const { userMenu, userName, logOutBtn, logOutBtnIcon } = styles;

export function UserMenu() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const name = useSelector(state => state.auth.user?.name);

    async function handleLogOut() {
        try {
            await dispatch(logOut());
            navigate('/', { replace: true });
        } catch (error) {}
    }

    return (
        <div className={userMenu}>
            <span className={userName}>{name}</span>
            <button type="button" className={logOutBtn} onClick={handleLogOut}>
                <LogoutIcon className={logOutBtnIcon} />
            </button>
        </div>
    );
}
