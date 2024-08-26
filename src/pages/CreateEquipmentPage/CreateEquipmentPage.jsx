import { CreateEquipmentForm } from 'components/CreateEquipmentForm/CreateEquipmentForm';
import { BackToEquipmentsButton } from 'components/BackToEquipmentsButton/BackToEquipmentsButton';

import styles from './CreateEquipmentPage.module.scss';
const { createEquipmentSection, btnWrapper } = styles;

export function CreateEquipmentPage({ type }) {
    return (
        <section className={createEquipmentSection}>
            <div className="container">
                <div className={btnWrapper}>
                    <BackToEquipmentsButton />
                </div>
                <CreateEquipmentForm type={type} />
            </div>
        </section>
    );
}
