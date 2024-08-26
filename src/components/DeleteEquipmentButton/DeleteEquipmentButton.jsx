import { Notify } from 'notiflix';
import { useNavigate } from 'react-router-dom';

import { useDeleteEquipmentMutation } from '../../redux/equipments/equipmentsApi';

import styles from './DeleteEquipmentButton.module.scss';
const { deleteBtn } = styles;

export function DeleteEquipmentButton({ equipmentId }) {
    const navigate = useNavigate();
    const [deleteEquipment, { error }] = useDeleteEquipmentMutation();

    error && Notify.failure(error.data.message);

    async function handleClick() {
        try {
            await deleteEquipment(equipmentId);
            Notify.success('Equipment deleted success');
            navigate(`/equipments`, { replace: true });
        } catch (error) {}
    }

    return (
        <button className={deleteBtn} type="button" onClick={handleClick}>
            DELETE
        </button>
    );
}
