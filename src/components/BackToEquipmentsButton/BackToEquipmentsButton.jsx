import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import styles from './BackToEquipmentsButton.module.scss';
const { backBtn } = styles;

export function BackToEquipmentsButton() {
    const navigate = useNavigate();

    function handleClickBtn() {
        navigate('/equipments');
    }

    return (
        <button className={backBtn} type="button" onClick={handleClickBtn}>
            <ArrowBackIcon />
        </button>
    );
}
