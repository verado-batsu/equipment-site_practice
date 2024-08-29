import Pagination from '@mui/material/Pagination';

import styles from './EquipmentsPagination.module.scss';
const { equipmentsPagination } = styles;

export function EquipmentsPagination({ total, limit, handlePaginationChange }) {
    return (
        <Pagination
            className={equipmentsPagination}
            count={Math.ceil(total / limit)}
            onChange={handlePaginationChange}
        />
    );
}
