import { useState } from 'react';
import { Notify } from 'notiflix';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { useGetEquipmentsQuery } from '../../redux/equipments/equipmentsApi';

import { FilterBar } from 'components/FilterBar/FilterBar';
import { EquipmentList } from 'components/EquipmentList/EquipmentList';

import styles from './EquipmentsPage.module.scss';
import { SearchForm } from 'components/SearchForm/SearchForm';
const { equipmentsSection } = styles;

export function EquipmentsPage() {
    const [categoryParam, setCategoryParam] = useState('');
    const [queryParam, setQueryParam] = useState('');
    const [category, setCategory] = useState('all');

    const { data, isFetching, error } = useGetEquipmentsQuery({
        categoryParam,
        queryParam,
    });

    function handleEquipmentFilter(e) {
        const category = e.target.textContent.toLowerCase();

        if (category === 'all') {
            setCategoryParam('');
            setCategory('all');
            return;
        }

        setCategoryParam(category);
        setCategory(category);
    }

    function handleSearchSubmit(e) {
        e.preventDefault();

        const searchedModel = e.target.model.value;

        setQueryParam(searchedModel);
    }

    return (
        <section className={equipmentsSection}>
            <div className="container">
                <SearchForm handleSearchSubmit={handleSearchSubmit} />
                <FilterBar
                    handleEquipmentFilter={handleEquipmentFilter}
                    currentCategory={category}
                />

                {data && <EquipmentList equipments={data} />}

                {isFetching && (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress
                            sx={{
                                color: 'rgba(23, 61, 51, 0.75)',
                            }}
                        />
                    </Box>
                )}
            </div>
            {error && Notify.failure(error)}
        </section>
    );
}
