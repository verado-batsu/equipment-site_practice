import styles from './EquipmentDetails.module.scss';
const { equipmentDetails } = styles;

export function EquipmentDetails() {
    return (
        <section className={equipmentDetails}>
            <div className="container">Equipment Details</div>
        </section>
    );
}
