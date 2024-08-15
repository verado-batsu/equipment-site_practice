import { arrOfCategories } from 'constants';

import styles from './FilterBar.module.scss';
const { filterBarList, filterBarItem, filterBarBtn, active } = styles;

export function FilterBar({ handleEquipmentFilter, currentCategory }) {
    return (
        <ul className={filterBarList}>
            <li className={filterBarItem}>
                <button
                    className={
                        currentCategory === 'all'
                            ? `${filterBarBtn} ${active}`
                            : filterBarBtn
                    }
                    type="button"
                    onClick={handleEquipmentFilter}
                >
                    All
                </button>
            </li>
            {arrOfCategories.map(category => (
                <li className={filterBarItem} key={category}>
                    <button
                        className={
                            currentCategory === category.toLowerCase()
                                ? `${filterBarBtn} ${active}`
                                : filterBarBtn
                        }
                        type="button"
                        onClick={handleEquipmentFilter}
                    >
                        {category}
                    </button>
                </li>
            ))}
        </ul>
    );
}
