import { Component, OnInit, Input } from '@angular/core';
import { NoteInterface, Note } from 'src/app/shared/models/note.model';
import { deleteNote, updatePin, addNote, copyNote, updateNote } from '../../app.actions';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { AddLabelComponent } from '../add-label/add-label.component';
import { LabelInterface } from 'src/app/shared/models/label.model';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note:NoteInterface;
  hideNote: boolean = false;
  isEmptyNote: boolean;
  constructor(private store: Store, public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.isEmptyNote = !!(this.note.description.length || this.note.title.length);
  }

  onPinClicked(id: string, pinned: boolean) {
    const note = {
      id,
      pinned: !pinned
    };
    this.store.dispatch(updatePin({note}));
  }

  deleteNote(): void {
   this.store.dispatch(deleteNote({ id: this.note.id }))
  }

  addLabel(): void {
    this.dialog.open(AddLabelComponent, {
      data: this.note
    });
  }

  removeLabel(event, label: LabelInterface) {
    event.stopPropagation();
    const note = {...this.note};
    note.labels = note.labels.filter(lbl => lbl.id !== label.id);
    this.store.dispatch(updateNote({ note }));
  }

  makeCopy(): void {
    const {title, description} = this.note;
    this.store.dispatch(copyNote({note: {...new Note(title, description)}}));
  }

  onNoteClicked(event: MouseEvent): void {
    const element = event.target as HTMLElement;
    if(!element.className.includes('mat-icon')) {
      this.hideNote = !this.hideNote;
      const dialogRef = this.dialog.open(EditNoteComponent, {
        width: '35em',
        height: '15em',
        data: this.note
      });
      dialogRef.afterClosed().subscribe(() => this.hideNote = !this.hideNote);
    }
  }

}
