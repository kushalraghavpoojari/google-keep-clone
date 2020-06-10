import { createEffect, Actions, ofType } from '@ngrx/effects';
import { tap, mergeMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { addNote, loadNotes, loadNotesSuccess } from './app.actions';
import { AngularFirestore } from '@angular/fire/firestore';
import { NoteInterface } from './shared/models/note.model';

@Injectable()
export class AppEffects {
    addNote$ = createEffect(() => this.action$.pipe(
        ofType(addNote),
        tap(action => this.firestore.collection('notes').add(action.note) )
    ), { dispatch: false});

    loadNotes$ = createEffect(() => this.action$.pipe(
        ofType(loadNotes),
        mergeMap(() => this.firestore.collection('notes').valueChanges()
            .pipe(
                map((notesRes:NoteInterface[]) => loadNotesSuccess({notes: notesRes}))
            )
        )
    ));

    constructor(private action$: Actions, private firestore: AngularFirestore) {}
}