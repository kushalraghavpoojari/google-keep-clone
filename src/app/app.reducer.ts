import * as fromActions from './app.actions';
import { createReducer, on } from '@ngrx/store';
import { Note } from './shared/models/note.model';

export interface AppState {
    notes: Note[]
}

export const initialState: AppState = {
    notes: [{
        created_at: new Date(),
        description: 'test',
        labels: [],
        pinned: false,
        title: 'test'
    }, {
        created_at: new Date(),
        description: 'test',
        labels: [],
        pinned: false,
        title: 'test'
    }]
};

const _appReducer = createReducer(initialState,
    on(fromActions.addNote, (state, action) => ({
        ...state,
        notes: [...state.notes, action.note]
    }))
);

export function AppReducer(state, action): AppState {
    return _appReducer(state, action);
}