import * as fromActions from './app.actions';
import { createReducer, on } from '@ngrx/store';
import { Note, NoteInterface } from './shared/models/note.model';
import { LabelInterface } from './shared/models/label.model';

export interface AppState {
    notes: NoteInterface[],
    labels: LabelInterface[]
}

export const initialState: AppState = {
    notes: [],
    labels: []
};

const _appReducer = createReducer(initialState,
    on(fromActions.addNote, (state, action) => {
        return {
            ...state,
            notes: [...state.notes, action.note]
        }
    }),
    on(fromActions.loadNotesSuccess, (state, action) => ({
        ...state,
        notes: [...action.notes]
    })),
    on(fromActions.loadLabelsSuccess, (state, action) => ({
        ...state,
        labels: [...action.labels]
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