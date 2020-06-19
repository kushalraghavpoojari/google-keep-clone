import { createSelector } from '@ngrx/store';
import { AppState } from './app.reducer';


export const notesSelector = createSelector((state) => state['app'].notes, (notes) => notes);
export const labelsSelector = createSelector((state) => state['app'].labels, (labels) => labels);