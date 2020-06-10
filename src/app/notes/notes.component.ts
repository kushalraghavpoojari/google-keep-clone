import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { loadNotes } from '../app.actions';
import { Observable } from 'rxjs';
import { NoteInterface } from '../shared/models/note.model';
import { notesSelector } from '../app.selector';
import { state } from '@angular/animations';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes$: Observable<NoteInterface[]>;
  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.notes$ = this.store.pipe(select(notesSelector));
  }

}