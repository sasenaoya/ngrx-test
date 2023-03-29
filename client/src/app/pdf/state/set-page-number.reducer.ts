import { createReducer, on } from '@ngrx/store';
import { setPageNumber } from './pdf.action';

export const initialState = 0;

export const setPageNumberReducer = createReducer(
    initialState,
    on(setPageNumber, (state, { pageNumber }) => pageNumber),
);
