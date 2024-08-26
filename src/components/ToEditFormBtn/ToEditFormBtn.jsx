import { useNavigate } from 'react-router-dom';

import styles from './ToEditFormBtn.module.scss';
const { editBtn } = styles;

export function ToEditFormButton() {
    const navigate = useNavigate();

    function handleClickBtn() {
        navigate('/edit');
    }

    return (
        <button className={editBtn} type="button" onClick={handleClickBtn}>
            EDIT
        </button>
    );
}
