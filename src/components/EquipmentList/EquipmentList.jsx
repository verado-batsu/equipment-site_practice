import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import styles from './EquipmentList.module.scss';
const {
    listWrapper,
    equipmentList,
    equipmentItem,
    equipmentLink,
    equipmentCardContent,
} = styles;

export function EquipmentList({ equipments }) {
    return (
        <div className={listWrapper}>
            <ul className={equipmentList}>
                {equipments?.length > 0 ? (
                    equipments.map(equipment => (
                        <li key={equipment._id} className={equipmentItem}>
                            <Link
                                to={`${equipment._id}`}
                                className={equipmentLink}
                            >
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        component="img"
                                        alt={equipment.model}
                                        height="140"
                                        image={equipment.photos[0].url}
                                    />
                                    <div className={equipmentCardContent}>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="div"
                                        >
                                            {equipment.model}
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            variant="subtitle2"
                                            component="div"
                                        >
                                            Останні зміни додав{' '}
                                            {equipment.owner.name}
                                        </Typography>
                                    </div>
                                </Card>
                            </Link>
                        </li>
                    ))
                ) : (
                    <p>We don`t have this type of equipment</p>
                )}
            </ul>
        </div>
    );
}
