import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { Notify } from 'notiflix';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { useGetEquipmentsQuery } from '../../redux/equipments/equipmentsApi';

import { FilterBar } from 'components/FilterBar/FilterBar';
import { EquipmentList } from 'components/EquipmentList/EquipmentList';
import { SearchForm } from 'components/SearchForm/SearchForm';
import { EquipmentsPagination } from 'components/EquipmentsPagination/EquipmentsPagination';

import styles from './EquipmentsPage.module.scss';
const { equipmentsSection } = styles;

export function EquipmentsPage() {
    const [categoryParam, setCategoryParam] = useState('');
    const [queryParam, setQueryParam] = useState('');
    const [pageParam, setPageParam] = useState(1);
    const [limitParam, setLimitParam] = useState(4);
    const [category, setCategory] = useState('all');

    const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });

    const { data, isFetching, error } = useGetEquipmentsQuery({
        categoryParam,
        queryParam,
        pageParam,
        limitParam,
    });

    useEffect(() => {
        if (isDesktop === true) {
            setLimitParam(8);
        } else {
            setLimitParam(4);
        }
    }, [isDesktop]);

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

    function handlePaginationChange(e, page) {
        setPageParam(page);
    }

    return (
        <section className={equipmentsSection}>
            <div className="container">
                <SearchForm handleSearchSubmit={handleSearchSubmit} />
                <FilterBar
                    handleEquipmentFilter={handleEquipmentFilter}
                    currentCategory={category}
                />

                {data?.equipments && (
                    <EquipmentList equipments={data?.equipments} />
                )}

                {isFetching && (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress
                            sx={{
                                color: 'rgba(23, 61, 51, 0.75)',
                            }}
                        />
                    </Box>
                )}

                {data?.total / limitParam > 1 && (
                    <EquipmentsPagination
                        total={data?.total}
                        limit={limitParam}
                        handlePaginationChange={handlePaginationChange}
                    />
                )}
            </div>
            {error && Notify.failure(error)}
        </section>
    );
}
