import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { useDeleteEquipmentMutation } from '../../redux/equipments/equipmentsApi';

import styles from './DeleteEquipmentButton.module.scss';
const { deleteBtn } = styles;

export function DeleteEquipmentButton({ equipmentId }) {
    const navigate = useNavigate();
    const [deleteEquipment, { error }] = useDeleteEquipmentMutation();

    error && toast.error(error.data.message);

    async function handleClick() {
        try {
            await deleteEquipment(equipmentId);
            toast.success('Equipment deleted success');
            navigate(`/equipments`, { replace: true });
        } catch (error) {}
    }

    return (
        <button className={deleteBtn} type="button" onClick={handleClick}>
            DELETE
        </button>
    );
}
