import { EquipmentList } from 'components/EquipmentList/EquipmentList';

import styles from './DraggingEquipment.module.scss';
const { draggingEquipment } = styles;

export function DraggingEquipment() {
    return (
        <section className={draggingEquipment}>
            <div className="container">
                <h2>Dragging Equipment</h2>
                <EquipmentList />
            </div>
        </section>
    );
}
