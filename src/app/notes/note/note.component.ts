import { Component, OnInit, Input } from '@angular/core';
import { NoteInterface } from 'src/app/shared/models/note.model';
import { deleteNote, updatePin } from '../../app.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note:NoteInterface;
  constructor(private store: Store) { }

  ngOnInit(): void {
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

}
