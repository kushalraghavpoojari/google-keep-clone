import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map, take, first } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { Observable } from 'rxjs';
import { NoteInterface } from '../shared/models/note.model';
import { notesSelector } from '../app.selector';
import { trigger, transition, animate, style } from '@angular/animations'
import { deleteNote } from '../app.actions';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes: Observable<NoteInterface[]>;
  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.pipe(select(notesSelector)).subscribe(notes => {
      this.notes = notes;
    });
  }

  deleteNote(id: string) {
   this.store.dispatch(deleteNote({id}))
  }
}
