import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app-state';
import { LoadingState } from 'src/app/store/models/loadingState';
import { selectIsLoading } from 'src/app/store/selectors/loading.selectors';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent  {

  // loadingState$: Observable<LoadingState>;

  // constructor(private store: Store<AppState>) { }

  // ngOnInit() {
  //   this.loadingState$ = this.store.select('loading');
  // }

  isLoading$: Observable<boolean>;

  constructor(private store: Store<{ loading: LoadingState }>) {
    this.isLoading$ = this.store.select(selectIsLoading);
  }
}
