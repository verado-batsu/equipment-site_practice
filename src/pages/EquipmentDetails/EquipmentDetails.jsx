import { useParams } from 'react-router-dom';

import { getEquipmentById } from 'api/fakeAPI';

import styles from './EquipmentDetails.module.scss';
const {
    equipmentDetails,
    equipmentImg,
    equipmentInfo,
    equipmentTitle,
    equipmentFeatures,
    equipmentDescr,
} = styles;

export function EquipmentDetails() {
    const { equipmentId } = useParams();
    const equipment = getEquipmentById(equipmentId);

    return (
        <section className={equipmentDetails}>
            <div className="container">
                <img
                    className={equipmentImg}
                    src={equipment?.photos[0] || ''}
                    alt={equipment?.model || ''}
                />
                <div className={equipmentInfo}>
                    <h2 className={equipmentTitle}>{equipment?.model || ''}</h2>
                    <p
                        className={equipmentFeatures}
                        style={{ whiteSpace: 'pre-wrap' }}
                    >
                        {equipment?.features || ''}
                    </p>
                    <p
                        className={equipmentDescr}
                        style={{ whiteSpace: 'pre-wrap' }}
                    >
                        {equipment?.describe || ''}
                    </p>
                </div>
            </div>
        </section>
    );
}
