import { Injectable } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PuissanceGameActionTypes } from './player.actions';

@Injectable()
export class PlayerEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  appContent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PuissanceGameActionTypes.getAppContent)
      switchMap(action =>
        this.apiService.getAppContent().pipe(
          map(appContent => PuissanceGameActionTypes.getAppContentSuccess({ payload })),
          catchError(error => of)
        )
      )

    )
  );
}
