import * as fromActions from './app.actions';
import { createReducer, on } from '@ngrx/store';
import { Note, NoteInterface } from './shared/models/note.model';

export interface AppState {
    notes: Note[]
}

export const initialState: AppState = {
    notes: []
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
        notes: [...action.notes]
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