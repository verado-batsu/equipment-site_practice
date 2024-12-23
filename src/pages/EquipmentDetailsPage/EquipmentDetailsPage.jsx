import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';

import { useGetEquipmentByIdQuery } from '../../redux/equipments/equipmentsApi';

import { EquipmentDetailsCard } from 'components/EquipmentDetailsCard/EquipmentDetailsCard';
import { BackToEquipmentsButton } from 'components/BackToEquipmentsButton/BackToEquipmentsButton';
import { DeleteEquipmentButton } from 'components/DeleteEquipmentButton/DeleteEquipmentButton';

import styles from './EquipmentDetails.module.scss';
const { equipmentDetailsSection, btnWrapper } = styles;

export function EquipmentDetailsPage() {
    const { equipmentId } = useParams();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    const {
        data: equipment,
        isFetching,
        error,
    } = useGetEquipmentByIdQuery(equipmentId);

    return (
        <section className={equipmentDetailsSection}>
            <div className="container">
                <div className={btnWrapper}>
                    <BackToEquipmentsButton />
                    {isLoggedIn && (
                        <DeleteEquipmentButton equipmentId={equipmentId} />
                    )}
                </div>
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
            {error && toast.error(error)}
        </section>
    );
}
