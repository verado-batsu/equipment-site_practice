import { useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import styles from './SearchForm.module.scss';
const { searchForm, searchFormInput, searchFormBtn } = styles;

export function SearchForm({ handleSearchSubmit }) {
    const [filter, setFilter] = useState('');

    function handleChange(e) {
        setFilter(e.target.value);
    }

    return (
        <form className={searchForm} onSubmit={handleSearchSubmit}>
            <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel id="demo-simple-select-label">
                    Фільтр запиту
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filter}
                    label="Фільтр запиту"
                    name="filter"
                    onChange={handleChange}
                >
                    <MenuItem value={'q'}>Модель</MenuItem>
                    <MenuItem value={'pp'}>Сила преса, МН</MenuItem>
                    <MenuItem value={'fp'}>Маса падаючих частин, кг</MenuItem>
                </Select>
            </FormControl>
            <TextField
                className={searchFormInput}
                size="small"
                id="outlined-search"
                label="Search"
                type="search"
                name="query"
            />
            <button className={searchFormBtn} type="submit">
                <SearchIcon />
            </button>
        </form>
    );
}
