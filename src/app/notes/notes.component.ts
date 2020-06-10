import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { Observable } from 'rxjs';
import { NoteInterface } from '../shared/models/note.model';
import { notesSelector } from '../app.selector';
import { trigger, transition, animate, style } from '@angular/animations'
import { deleteNote } from '../app.actions';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class NotesComponent implements OnInit {
  notes$: Observable<NoteInterface[]>;
  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.notes$ = this.store.pipe(select(notesSelector));
    // this.notes$.subscribe(n => console.log(n))
  }

  deleteNote(id: String) {
   this.store.dispatch(deleteNote({id}))
  }
}
