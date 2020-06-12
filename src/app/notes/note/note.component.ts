import { Component, OnInit, Input } from '@angular/core';
import { NoteInterface } from 'src/app/shared/models/note.model';
import { deleteNote, updatePin } from '../../app.actions';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteComponent } from '../edit-note/edit-note.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note:NoteInterface;
  hideNote: boolean = false;
  constructor(private store: Store, public dialog: MatDialog) { }

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

  onNoteClicked(event: MouseEvent) {
    this.hideNote = !this.hideNote;
    const element = event.target as HTMLElement;
    if(!element.className.includes('mat-icon')) {
      const dialogRef = this.dialog.open(EditNoteComponent, {
        width: '35em',
        data: this.note
      });
      dialogRef.afterClosed().subscribe(() => this.hideNote = !this.hideNote);
    }
  }

}
