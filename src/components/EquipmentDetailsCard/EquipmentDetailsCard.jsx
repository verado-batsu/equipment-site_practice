import { useSelector } from 'react-redux';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { EquipmentSlider } from 'components/EquipmentSlider/EquipmentSlider';
import { ToEditFormButton } from 'components/ToEditFormBtn/ToEditFormBtn';

import styles from './EquipmentDetailsCard.module.scss';
const {
    detailsWrapper,
    equipmentType,
    equipmentFeatures,
    equipmentFeaturesList,
    equipmentFeaturesItem,
    equipmentMainFeaturesItem,
    equipmentDescr,
} = styles;

export function EquipmentDetailsCard({ equipment }) {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    return (
        <div className={detailsWrapper}>
            <EquipmentSlider imagesData={equipment.photos} />
            <Card className={equipmentFeatures}>
                {isLoggedIn && <ToEditFormButton equipment={equipment} />}
                <CardContent>
                    <Typography
                        variant="h5"
                        sx={{
                            paddingRight: '54px',
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
                    <p className={equipmentType}>
                        Тип: {equipment.typeOfEquipment}
                    </p>
                    <Typography variant="h6">Характеристики:</Typography>
                    <ul className={equipmentFeaturesList}>
                        {equipment.mainFeature !== 'other' && (
                            <li
                                className={equipmentMainFeaturesItem}
                                key={equipment.mainFeature}
                            >
                                <p>
                                    {equipment.mainFeature}:{' '}
                                    {equipment.valueOfMainFeature}
                                </p>
                            </li>
                        )}

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
