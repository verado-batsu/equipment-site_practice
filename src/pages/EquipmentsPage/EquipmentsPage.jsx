import { getEquipments } from 'api/fakeAPI';

import { EquipmentList } from 'components/EquipmentList/EquipmentList';

import styles from './EquipmentsPage.module.scss';
const { equipmentsSection, equipmentsTitle } = styles;

export function EquipmentsPage() {
    const equipments = getEquipments('forging');
    return (
        <section className={equipmentsSection}>
            <div className="container">
                <h2 className={equipmentsTitle}>Equipments Page</h2>
                <EquipmentList equipments={equipments} />
            </div>
        </section>
    );
}
