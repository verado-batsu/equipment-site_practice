import { useState } from 'react';

import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import styles from './SearchForm.module.scss';
const { searchForm, searchFormInput, searchFormBtn } = styles;

export function SearchForm({ handleSearchSubmit }) {
    return (
        <form className={searchForm} onSubmit={handleSearchSubmit}>
            <TextField
                className={searchFormInput}
                size="small"
                id="outlined-search"
                label="Search"
                type="search"
                name="model"
            />
            <button className={searchFormBtn} type="submit">
                <SearchIcon />
            </button>
        </form>
    );
}
