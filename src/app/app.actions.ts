  
import { createAction, props } from '@ngrx/store';
import { NoteInterface } from './shared/models/note.model';
import { LabelInterface } from './shared/models/label.model';

export const loadNotes = createAction('[Home] Load Notes');
export const loadLabels = createAction('[Home] Load Labels');
export const loadNotesSuccess = createAction('[App Effects] Load All Notes Success', props<{ notes:NoteInterface[] }>());
export const loadLabelsSuccess = createAction('[App Effects] Load All Labels Success', props<{ labels:LabelInterface[] }>());
export const addNote = createAction('[Create Note] Add Note', props<{ note: NoteInterface }>());
export const copyNote = createAction('[Note Options] Copy Note', props<{ note: NoteInterface }>());
export const deleteNote = createAction('[Note] Delete Note', props<{ id: string }>());
export const updatePin = createAction('[Note] Update Pin', props<{ note: Partial<NoteInterface> }>());
export const updateNote = createAction('[Edit Note] Update Note', props<{ note: Partial<NoteInterface> }>());
export const addLabel = createAction('[Note] Add Label', props<{ label: LabelInterface }>());