import { getEquipments } from 'api/fakeAPI';

import { EquipmentList } from 'components/EquipmentList/EquipmentList';

import styles from './ForgingEquipment.module.scss';
const { forgingEquipment, forgingTitle } = styles;

export function ForgingEquipment() {
    const equipments = getEquipments('forging');
    return (
        <section className={forgingEquipment}>
            <div className="container">
                <h2 className={forgingTitle}>Forging Equipment</h2>
                <EquipmentList equipments={equipments} />
            </div>
        </section>
    );
}
