import { createReducer, on } from '@ngrx/store';
import { IPdf } from '../pdf.model';
import { setPdf } from './pdf.action';

export const initialState: IPdf = {};

export const pdfReducer = createReducer(
    initialState,
    on(setPdf, (state, { pdf }) => pdf),
);