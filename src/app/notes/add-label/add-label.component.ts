import { Component, OnInit, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { labelsSelector } from 'src/app/app.selector';
import { Observable, Subscription } from 'rxjs';
import { LabelInterface } from 'src/app/shared/models/label.model';
import { NoteInterface } from 'src/app/shared/models/note.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { updateNote, addLabel } from 'src/app/app.actions';

@Component({
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrls: ['./add-label.component.scss']
})
export class AddLabelComponent implements OnInit {
  searchValue = '';
  note: NoteInterface;
  labels: LabelInterface[];
  storeLabels: LabelInterface[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: NoteInterface, private store: Store, public dialogRef: MatDialogRef<AddLabelComponent>) {
    this.note = {...this.data};
  }

  ngOnInit(): void {
    this.store.pipe(select(labelsSelector)).subscribe(labels => {
      this.storeLabels = labels;
      this.labels = this.storeLabels;
    });
  }

  onSearchValueChange(): void {
    this.labels = this.storeLabels.filter(lbl => lbl.name.includes(this.searchValue));
  }
  
  onChecked(label: LabelInterface): void {
    const hasLabel = this.note.labels.find(lbl => lbl.id === label.id);
    if (!hasLabel) {
      this.note.labels = [...this.note.labels, label];
    } else {
      this.note.labels = this.note.labels.filter( lbl => lbl.id !== label.id);
    }
  }

  updateNote(): void {
    this.store.dispatch(updateNote({note: this.note}));
    this.dialogRef.close();
  }

  isChecked(label: LabelInterface): boolean {
    return this.data.labels.some(lbl => lbl.id === label.id);
  }

  addNewLabel(): void {
    this.store.dispatch(addLabel({
      label: {name: this.searchValue},
      note: this.note
    }));
    this.dialogRef.close();
  }
}
