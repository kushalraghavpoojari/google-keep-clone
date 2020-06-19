import { createEffect, Actions, ofType } from '@ngrx/effects';
import { tap, mergeMap, map } from 'rxjs/operators';
import { from, pipe } from 'rxjs';
import { Injectable } from '@angular/core';
import { addNote, loadNotes, loadNotesSuccess, updatePin, deleteNote, updateNote, copyNote, addLabel, loadLabels, loadLabelsSuccess } from './app.actions';
import { AngularFirestore } from '@angular/fire/firestore';
import { NoteInterface } from './shared/models/note.model';
import { LabelInterface } from './shared/models/label.model';

@Injectable()
export class AppEffects {
    addNote$ = createEffect(() => this.action$.pipe(
        ofType(addNote, copyNote),
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

    loadLabels$ = createEffect(() => this.action$.pipe(
        ofType(loadLabels),
        mergeMap(() => this.firestore
            .collection<LabelInterface>('labels')
            .snapshotChanges()
            .pipe(
                map(labelsArr => {
                    return labelsArr.map(label => {
                        return {
                            id: label.payload.doc.id,
                            ...label.payload.doc.data()
                        };
                    });
                }),
                map((labelRes:LabelInterface[]) => loadLabelsSuccess({labels: labelRes}))
            )
        )
    ));

    updateNote$ = createEffect(() => this.action$.pipe(
        ofType(updateNote, updatePin),
        tap(action => this.firestore.collection<NoteInterface>('notes').doc(action.note.id).update(action.note))
    ), { dispatch: false });

    deleteNote$ = createEffect(() => this.action$.pipe(
        ofType(deleteNote),
        tap(action => this.firestore.collection('notes').doc(action.id).delete())
    ), { dispatch: false });

    addLabel$ = createEffect(() => this.action$.pipe(
        ofType(addLabel),
        mergeMap((action) => from(this.firestore
            .collection<LabelInterface>('labels')
            .add(action.label))
            .pipe(
                map(addLabelRes => {
                    return {
                        id: addLabelRes.id,
                        name: action.label.name
                    };
                }),
                map((newLabel: LabelInterface) => {
                    const note = {...action.note};
                    note.labels = [...note.labels, newLabel];
                    return updateNote({note});
                })
            )
        )
    ));

    constructor(private action$: Actions, private firestore: AngularFirestore) {}
}