import { createEffect, Actions, ofType } from '@ngrx/effects';
import { tap, mergeMap, map } from 'rxjs/operators';
import { from } from 'rxjs';
import { Injectable } from '@angular/core';
import { addNote, loadNotes, loadNotesSuccess, updatePin, deleteNote, updateNote } from './app.actions';
import { AngularFirestore } from '@angular/fire/firestore';
import { NoteInterface } from './shared/models/note.model';

@Injectable()
export class AppEffects {
    addNote$ = createEffect(() => this.action$.pipe(
        ofType(addNote),
        tap(action => from(this.firestore.collection<NoteInterface>('notes').add(action.note)))
    ), { dispatch: false });

    loadNotes$ = createEffect(() => this.action$.pipe(
        ofType(loadNotes),
        mergeMap(() => this.firestore
            .collection<NoteInterface>('notes')
            .snapshotChanges()
            .pipe(
                map(notesArr => {
                    return notesArr.map(note => {
                        return {
                            id: note.payload.doc.id,
                            ...note.payload.doc.data()
                        };
                    });
                }),
                map((notesRes:NoteInterface[]) => loadNotesSuccess({notes: notesRes}))
            )
        )
    ));

    updatePin$ = createEffect(() => this.action$.pipe(
        ofType(updatePin),
        tap(action => this.firestore.collection<NoteInterface>('notes').doc(action.id).update({
            id: action.id,
            pinned: action.pinned
        }))
    ), { dispatch: false });

    updateNote$ = createEffect(() => this.action$.pipe(
        ofType(updateNote),
        tap(action => this.firestore.collection<NoteInterface>('notes').doc(action.note.id).update(action.note))
    ), { dispatch: false });

    deleteNote$ = createEffect(() => this.action$.pipe(
        ofType(deleteNote),
        tap(action => this.firestore.collection('notes').doc(action.id).delete())
    ), { dispatch: false });

    constructor(private action$: Actions, private firestore: AngularFirestore) {}
}