import { Component, OnInit, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { labelsSelector } from 'src/app/app.selector';
import { Observable } from 'rxjs';
import { LabelInterface } from 'src/app/shared/models/label.model';
import { NoteInterface } from 'src/app/shared/models/note.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { updateNote } from 'src/app/app.actions';

@Component({
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrls: ['./add-label.component.scss']
})
export class AddLabelComponent implements OnInit {
  value = '';
  labels: Observable<LabelInterface>;
  constructor(@Inject(MAT_DIALOG_DATA) public data: NoteInterface, private store: Store) { }

  ngOnInit(): void {
    this.labels = this.store.pipe(select(labelsSelector));
  }
  
  onChecked(label: LabelInterface) {
    const hasLabel = this.data.labels.find(lbl => lbl.id === label.id);
    if (!hasLabel) {
      const note = {...this.data};
      note.labels = [...note.labels, label];
      this.store.dispatch(updateNote({ note }));
    } else {
      const note = {...this.data};
      note.labels = note.labels.filter( lbl => lbl.id !== label.id);
      this.store.dispatch(updateNote({ note }));
    }
  }

  isChecked(label: LabelInterface) {
    return this.data.labels.some(lbl => lbl.id === label.id);
  }
}
