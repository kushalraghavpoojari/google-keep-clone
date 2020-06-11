import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Observable, Subscription } from 'rxjs';
import { NoteInterface } from '../shared/models/note.model';
import { notesSelector } from '../app.selector';
import { deleteNote, updatePin } from '../app.actions';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {
  notes: {pinned: NoteInterface[], other: NoteInterface[]} = { pinned: [], other: []};
  notesSubscription: Subscription;
  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.notesSubscription = this.store.pipe(select(notesSelector)).subscribe(notes => {
      this.notes.pinned = notes.filter((note: NoteInterface) => note.pinned );
      this.notes.other = notes.filter((note: NoteInterface) => !note.pinned );
    });
  }

  onPinClicked(id: string, pinned: boolean) {
    this.store.dispatch(updatePin({
      id,
      pinned: !pinned
    }));
  }

  deleteNote(id: string) {
   this.store.dispatch(deleteNote({id}))
  }

  ngOnDestroy(): void {
    this.notesSubscription.unsubscribe();
  }
}
