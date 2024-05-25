import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import styles from './EquipmentList.module.scss';
const {
    listWrapper,
    equipmentList,
    equipmentItem,
    equipmentLink,
    equipmentImg,
    equipmentTitle,
} = styles;

export function EquipmentList({ equipments }) {
    return (
        <div className={listWrapper}>
            <ul className={equipmentList}>
                {equipments ? (
                    equipments.map(equipment => (
                        <li
                            key={equipment.id}
                            // className={equipmentItem}
                        >
                            <Link
                                to={`${equipment.id}`}
                                className={equipmentLink}
                            >
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        component="img"
                                        alt={equipment.model}
                                        height="140"
                                        image={equipment.photos[0]}
                                    />
                                    <CardContent>
                                        {/* <img
                                        className={equipmentImg}
                                        src={equipment.photos[0]}
                                        alt={equipment.model}
                                    /> */}
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="div"
                                        >
                                            {equipment.model}
                                        </Typography>
                                        {/* <h3 className={equipmentTitle}>
                                            {equipment.model}
                                        </h3> */}
                                    </CardContent>
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
