import * as fromActions from './app.actions';
import { createReducer, on } from '@ngrx/store';
import { Note, NoteInterface } from './shared/models/note.model';
import { Label } from './shared/models/label.model';

export interface AppState {
    notes: Note[]
}

export const initialState: AppState = {
    notes: [{
        created_at: 'June 9th 2020, 10:18:32 pm',
        description: 'test descdddd',
        labels: [{id: '123', name: 'tes'}],
        pinned: false,
        title: 'title'
    }]
};

const _appReducer = createReducer(initialState,
    on(fromActions.addNote, (state, action) => {
        console.log(state, action)
        return {
            ...state,
            notes: [...state.notes, action.note]
        }
    }),
    on(fromActions.loadNotesSuccess, (state, action) => ({
        ...state,
        notes: [...state.notes, ...action.notes]
    })),
    on(fromActions.deleteNote, (state, action) => {
        const newNotesArr = state.notes.filter((note:NoteInterface) => note.id !== action.id);
        return {
            ...state,
            notes: newNotesArr
        };
    })
);

export function AppReducer(state, action): AppState {
    return _appReducer(state, action);
}