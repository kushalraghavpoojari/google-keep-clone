import { createSelector } from '@ngrx/store';
import { AppState } from './app.reducer';


export const notesSelector = createSelector((state) => state['app'].notes, (notes) => notes);