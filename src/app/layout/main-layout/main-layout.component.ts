import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingBarComponent } from '../loading-bar/loading-bar.component';
import { TitleCasePipe, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import * as fromUsers from 'app/core/user/user.reducer';
import { AuthActions } from 'app/core/auth/auth.actions';
import { UserActions } from 'app/core/user/user.actions';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, TitleCasePipe, DatePipe, LoadingBarComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  user = this._store.selectSignal(fromUsers.selectUser);

  currentYear = new Date().getFullYear();

  /**
   * Constructor
   */
  constructor(
    private readonly _store: Store
  ) { }

  // -------------------------------------------------------------------
  // @ Lifecycle hooks
  // -------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._store.dispatch(UserActions.loadUser());
  }

  // -------------------------------------------------------------------
  // @ Public methods
  // -------------------------------------------------------------------

  /**
   * Signs the user out
   */
  signOut(): void {
    this._store.dispatch(AuthActions.signOut());
  }
}
