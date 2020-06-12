import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { NoteInterface } from 'src/app/shared/models/note.model';
import * as moment from 'moment/moment';
import { Store } from '@ngrx/store';
import { updateNote, updatePin } from 'src/app/app.actions';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {
  note: Partial<NoteInterface> = {};
  constructor(@Inject(MAT_DIALOG_DATA) public data: NoteInterface, private store: Store, public dialogRef:MatDialogRef<EditNoteComponent>) {}

  ngOnInit(): void {
    this.note.modified_at = this.data.modified_at && moment(this.data.modified_at, 'MMMM Do YYYY, h:mm:ss a').calendar();
    this.note.pinned = this.data.pinned;
  }

  noteForm = new FormGroup({
    title: new FormControl(this.data.title),
    note: new FormControl(this.data.description),
  });

  onSave(): void {
    const {title, note} = this.noteForm.value;
    const updatedNote = {
      id: this.data.id,
      title,
      description: note,
      modified_at: moment().format('MMMM Do YYYY, h:mm:ss a')
    };
    this.store.dispatch(updateNote({ note: updatedNote }));
    this.dialogRef.close();
  }

  onPinClicked(): void {
    const id = this.data.id;
    this.note.pinned = !this.note.pinned;
    const pinned = this.note.pinned;
    const note = {
      id,
      pinned
    };
    this.store.dispatch(updatePin({note}));
  }

}
