// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { catchError, map, mergeMap } from 'rxjs/operators';
// import { of } from 'rxjs';
// import * as AuthActions from '../actions/auth.actions';
// import { UserauthService } from 'src/app/services/userauth.service';

// @Injectable()
// export class AuthEffects {
//   constructor(
//     private actions$: Actions,
//     private userauthService: UserauthService
//   ) {}

//   login$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.login),
//       mergeMap((action) =>
//         this.userauthService.login(action.email, action.password).pipe(
//           map((user) => AuthActions.loginSuccess({ user })),
//           catchError((error) => of(AuthActions.loginFailure({ error })))
//         )
//       )
//     )
//   );

//   recoverEmailPassword$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.recoverEmailPassword),
//       mergeMap((action) =>
//         this.userauthService.recoverEmailPassword(action.email).pipe(
//           map(() => AuthActions.recoverEmailPasswordSuccess()),
//           catchError((error) =>
//             of(AuthActions.recoverEmailPasswordFailure({ error }))
//           )
//         )
//       )
//     )
//   );
// }
