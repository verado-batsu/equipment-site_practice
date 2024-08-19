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
    // console.log(equipment);
    return (
        <div className={detailsWrapper}>
            <EquipmentSlider imagesData={equipment.photos} />
            {/* <div>
                <button className="prev">Prev</button>
                <button className="next">Next</button>
            </div> */}
            <Card className={equipmentFeatures}>
                <CardContent>
                    <Typography variant="h5">
                        {equipment?.model || ''}
                    </Typography>
                    <Typography variant="h6">Характеристики:</Typography>
                    <ul className={equipmentFeaturesList}>
                        {equipment?.features.map(feature => (
                            <li key={feature} className={equipmentFeaturesItem}>
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
