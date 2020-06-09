  
import { createAction, props } from '@ngrx/store';
import { Note } from '../shared/models/note.model';

export const loadNotes = createAction('[Home] Load All Notes');
export const addNote = createAction('[Create Note] Add Note', props<Note>());