import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Notify } from 'notiflix';

import { useGetEquipmentByIdQuery } from '../../redux/equipments/equipmentsApi';

import { EquipmentDetailsCard } from 'components/EquipmentDetailsCard/EquipmentDetailsCard';
import { BackToEquipmentsButton } from 'components/BackToEquipmentsBtn/BackToEquipmentsButton';

import styles from './EquipmentDetails.module.scss';
const { equipmentDetails } = styles;

export function EquipmentDetailsPage() {
    const { equipmentId } = useParams();

    const {
        data: equipment,
        isFetching,
        error,
    } = useGetEquipmentByIdQuery(equipmentId);

    return (
        <section className={equipmentDetails}>
            <div className="container">
                <BackToEquipmentsButton />
                {isFetching ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress
                            sx={{
                                color: 'rgba(23, 61, 51, 0.75)',
                            }}
                        />
                    </Box>
                ) : (
                    <EquipmentDetailsCard equipment={equipment} />
                )}
            </div>
            {error && Notify.failure(error)}
        </section>
    );
}
