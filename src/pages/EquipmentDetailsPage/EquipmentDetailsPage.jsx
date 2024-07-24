import { useParams } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { getEquipmentById } from 'api/fakeAPI';

import styles from './EquipmentDetails.module.scss';
const {
    equipmentDetails,
    detailsWrapper,
    equipmentImg,
    equipmentFeatures,
    equipmentDescr,
} = styles;

export function EquipmentDetailsPage() {
    const { equipmentId } = useParams();
    const equipment = getEquipmentById(equipmentId);

    return (
        <section className={equipmentDetails}>
            <div className="container">
                <div className={detailsWrapper}>
                    <img
                        className={equipmentImg}
                        src={equipment?.photos[0] || ''}
                        alt={equipment?.model || ''}
                    />
                    <Card className={equipmentFeatures}>
                        <CardContent>
                            <Typography variant="h5">
                                {equipment?.model || ''}
                            </Typography>
                            <Typography variant="h6">
                                Характеристики:
                            </Typography>
                            <Typography
                                variant="body2"
                                style={{ whiteSpace: 'pre-wrap' }}
                            >
                                {equipment?.features || ''}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card className={equipmentDescr}>
                        <CardContent>
                            <Typography
                                variant="body2"
                                style={{ whiteSpace: 'pre-wrap' }}
                            >
                                {equipment?.describe || ''}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
