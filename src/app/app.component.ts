import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';
import { loadNotes } from './app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'google-keep-clone';

  constructor(private store: Store<AppState>) {}
  ngOnInit() {
    this.store.dispatch(loadNotes());
  }
}
