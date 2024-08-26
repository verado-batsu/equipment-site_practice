import { useNavigate } from 'react-router-dom';

import styles from './ToEditFormBtn.module.scss';
const { editBtn } = styles;

export function ToEditFormButton({ equipment }) {
    const navigate = useNavigate();

    function handleClickBtn() {
        navigate(`/edit?equipmentId=${equipment._id}`);
    }

    return (
        <button className={editBtn} type="button" onClick={handleClickBtn}>
            EDIT
        </button>
    );
}
