  
import { createAction, props } from '@ngrx/store';
import { NoteInterface } from './shared/models/note.model';

export const loadNotes = createAction('[Home] Load Notes');
export const loadNotesSuccess = createAction('[App Effects] Load All Notes Success', props<{ notes:NoteInterface[] }>());
export const addNote = createAction('[Create Note] Add Note', props<{ note: NoteInterface }>());
export const deleteNote = createAction('[Note] Delete Note', props<{ id: string }>());
export const updatePin = createAction('[Note] Update Pin', props<{ id: string, pinned: boolean }>())
export const updateNote = createAction('[Edit Note] Update Note', props<{ note: Partial<NoteInterface> }>())