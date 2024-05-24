import { getEquipments } from 'api/fakeAPI';

import { EquipmentList } from 'components/EquipmentList/EquipmentList';

import styles from './RollingEquipment.module.scss';
const { rollingEquipment } = styles;

export function RollingEquipment() {
    const equipments = getEquipments('rolling');
    console.log(equipments);
    return (
        <section className={rollingEquipment}>
            <div className="container">
                <h2>Rolling Equipment</h2>
                <EquipmentList />
            </div>
        </section>
    );
}
