import { EquipmentList } from 'components/EquipmentList/EquipmentList';

import styles from './RollingEquipment.module.scss';
const { rollingEquipment } = styles;

export function RollingEquipment() {
    return (
        <section className={rollingEquipment}>
            <div className="container">
                <h2>Rolling Equipment</h2>
                <EquipmentList />
            </div>
        </section>
    );
}
