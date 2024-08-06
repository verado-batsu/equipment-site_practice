import { useDispatch, useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';

import { logOut } from '../../redux/users/usersOperations';

import styles from './UserMenu.module.scss';
const { userMenu, userName, logOutBtn, logOutBtnIcon } = styles;

export function UserMenu() {
    const dispatch = useDispatch();
    const name = useSelector(state => state.auth.user.name);

    function handleLogOut() {
        dispatch(logOut());
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
