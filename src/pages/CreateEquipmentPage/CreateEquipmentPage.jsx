import { CreateEquipmentForm } from 'components/CreateEquipmentForm/CreateEquipmentForm';

import styles from './CreateEquipmentPage.module.scss';
const { createEquipmentSection } = styles;

export function CreateEquipmentPage() {
    return (
        <section className={createEquipmentSection}>
            <div className="container">
                <CreateEquipmentForm />
            </div>
        </section>
    );
}
