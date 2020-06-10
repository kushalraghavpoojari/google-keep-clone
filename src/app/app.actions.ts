  
import { createAction, props } from '@ngrx/store';
import { NoteInterface } from './shared/models/note.model';

export const loadNotes = createAction('[Home] Load Notes');
export const loadNotesSuccess = createAction('[Home] Load All Notes Success', props<{notes:NoteInterface[]}>());
export const addNote = createAction('[Create Note] Add Note', props<{note: NoteInterface}>());