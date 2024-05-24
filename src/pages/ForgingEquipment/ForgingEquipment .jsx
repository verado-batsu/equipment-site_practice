import { EquipmentList } from 'components/EquipmentList/EquipmentList';

import styles from './ForgingEquipment.module.scss';
const { forgingEquipment } = styles;

export function ForgingEquipment() {
    return (
        <section className={forgingEquipment}>
            <div className="container">
                <h2>Forging Equipment</h2>
                <EquipmentList />
            </div>
        </section>
    );
}
