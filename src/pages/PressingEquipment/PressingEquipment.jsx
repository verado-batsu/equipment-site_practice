import { EquipmentList } from 'components/EquipmentList/EquipmentList';

import styles from './PressingEquipment.module.scss';
const { pressingEquipment } = styles;

export function PressingEquipment() {
    return (
        <section className={pressingEquipment}>
            <div className="container">
                <h2>Pressing Equipment</h2>
                <EquipmentList />
            </div>
        </section>
    );
}
