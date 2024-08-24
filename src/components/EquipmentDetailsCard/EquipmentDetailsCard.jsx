import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import styles from './EquipmentDetailsCard.module.scss';
import { EquipmentSlider } from 'components/EquipmentSlider/EquipmentSlider';
const {
    detailsWrapper,
    equipmentFeatures,
    equipmentFeaturesList,
    equipmentFeaturesItem,
    equipmentDescr,
} = styles;

export function EquipmentDetailsCard({ equipment }) {
    return (
        <div className={detailsWrapper}>
            <EquipmentSlider imagesData={equipment.photos} />
            <Card className={equipmentFeatures}>
                <CardContent>
                    <Typography
                        variant="h5"
                        sx={{
                            wordWrap: 'break-word',
                        }}
                    >
                        {equipment?.model || ''}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            color: 'rgba(129, 129, 129, 0.75)',
                            textDecoration: 'underline',
                        }}
                    >
                        Останні зміни додав {equipment?.owner.name || ''}
                    </Typography>
                    <Typography variant="h6">Характеристики:</Typography>
                    <ul className={equipmentFeaturesList}>
                        {equipment?.features.map((feature, i) => (
                            <li key={i} className={equipmentFeaturesItem}>
                                <Typography
                                    variant="body2"
                                    style={{ whiteSpace: 'pre-wrap' }}
                                >
                                    {feature}
                                </Typography>
                            </li>
                        ))}
                    </ul>
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
    );
}
