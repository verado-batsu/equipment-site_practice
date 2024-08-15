import { useState } from 'react';
import { Notify } from 'notiflix';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { useGetEquipmentsQuery } from '../../redux/equipments/equipmentsApi';

import { FilterBar } from 'components/FilterBar/FilterBar';
import { EquipmentList } from 'components/EquipmentList/EquipmentList';

import styles from './EquipmentsPage.module.scss';
const { equipmentsSection } = styles;

export function EquipmentsPage() {
    const [params, setParams] = useState('');

    const { data, isFetching, error } = useGetEquipmentsQuery(params);

    function handleEquipmentFilter(e) {
        const category = e.target.textContent.toLowerCase();

        if (category === 'all') {
            setParams('');
            return;
        }

        setParams(`category=${category}`);
    }

    return (
        <section className={equipmentsSection}>
            <div className="container">
                <FilterBar handleEquipmentFilter={handleEquipmentFilter} />

                {data && <EquipmentList equipments={data} />}

                {isFetching && (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                )}
            </div>
            {error && Notify.failure(error)}
        </section>
    );
}
