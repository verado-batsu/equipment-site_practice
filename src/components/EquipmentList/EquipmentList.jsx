import styles from './EquipmentList.module.scss';
const { equipmentList, equipmentItem } = styles;

export function EquipmentList() {
    return (
        <ul className={equipmentList}>
            <li className={equipmentItem}></li>
        </ul>
    );
}
