import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Note } from '../shared/models/note.model';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { addNote } from '../app.actions';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {
  isFocused: Boolean = false;
  constructor(private firestore: AngularFirestore, private store: Store) { }

  ngOnInit(): void {
    // this.firestore
    //   .collection('notes')
    //   .snapshotChanges()
    //   .pipe(
    //     tap(n => console.log(n))
    //   )
    //   .subscribe(n => console.log(n))
  }

  noteForm = new FormGroup({
    title: new FormControl(''),
    note: new FormControl(''),
  });

  onTextAreaFocus(): void {
    this.isFocused = true;
  }

  onTextAreaBlur(): void {
    this.isFocused = false;
  }

  createNote(): void {
    const {title, note} = this.noteForm.value;
    this.store.dispatch(addNote({note: {...new Note(title, note)}}));
    this.noteForm.reset();
  }

}
