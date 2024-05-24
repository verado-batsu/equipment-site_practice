import { EquipmentList } from 'components/EquipmentList/EquipmentList';

import styles from './StampingEquipment.module.scss';
const { stampingEquipment } = styles;

export function StampingEquipment() {
    return (
        <section className={stampingEquipment}>
            <div className="container">
                <h2>Stamping Equipment</h2>
                <EquipmentList />
            </div>
        </section>
    );
}
