import { Link } from 'react-router-dom';

import styles from './EquipmentList.module.scss';
const {
    listWrapper,
    equipmentList,
    equipmentItem,
    equipmentLink,
    equipmentImg,
    equipmentTitle,
} = styles;

export function EquipmentList({ equipments }) {
    return (
        <div className={listWrapper}>
            <ul className={equipmentList}>
                {equipments ? (
                    equipments.map(equipment => (
                        <li key={equipment.id} className={equipmentItem}>
                            <Link
                                to={`${equipment.id}`}
                                className={equipmentLink}
                            >
                                <img
                                    className={equipmentImg}
                                    src={equipment.photos[0]}
                                    alt="equipment_photo"
                                />
                                <h3 className={equipmentTitle}>
                                    {equipment.model}
                                </h3>
                            </Link>
                        </li>
                    ))
                ) : (
                    <p>We don`t have this type of equipment</p>
                )}
            </ul>
        </div>
    );
}
