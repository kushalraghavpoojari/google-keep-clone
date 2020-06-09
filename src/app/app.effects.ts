import { createEffect, Actions, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { addNote } from './app.actions';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class AppEffects {
    logout$ = createEffect(() => this.action$.pipe(
        ofType(addNote),
        tap(action => {
            console.log(action)
            return this.firestore.collection('notes').add(action.note)
        })
    ), { dispatch: false});

    constructor(private action$: Actions, private firestore: AngularFirestore) {}
}