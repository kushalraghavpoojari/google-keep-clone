import * as fromActions from './app.actions';
import { createReducer, on } from '@ngrx/store';
import { Note } from './shared/models/note.model';

export interface AppState {
    notes: Note[]
}

export const initialState: AppState = {
    notes: []
};

const _appReducer = createReducer(initialState,
    on(fromActions.addNote, (state, action) => ({
        ...state,
        notes: [...state.notes, action.note]
    })),
    on(fromActions.loadNotesSuccess, (state, action) => ({
        ...state,
        notes: [...action.notes]
    }))
);

export function AppReducer(state, action): AppState {
    return _appReducer(state, action);
}