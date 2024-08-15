import Button from '@mui/material/Button';

import { arrOfCategories } from 'constants';

import styles from './FilterBar.module.scss';
const { filterBarList, filterBarItem } = styles;

export function FilterBar({ handleEquipmentFilter }) {
    return (
        <ul className={filterBarList}>
            <li className={filterBarItem}>
                <Button
                    type="button"
                    variant="outlined"
                    onClick={handleEquipmentFilter}
                >
                    All
                </Button>
            </li>
            {arrOfCategories.map(category => (
                <li className={filterBarItem} key={category}>
                    <Button
                        type="button"
                        variant="outlined"
                        onClick={handleEquipmentFilter}
                    >
                        {category}
                    </Button>
                </li>
            ))}
        </ul>
    );
}
