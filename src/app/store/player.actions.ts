import { createAction, props } from '@ngrx/store'

import * as fromModels from '@app/shared/models'

export enum PuissanceGameActionTypes {
  getAppContent = '[Puissance Game] get App Content',
  getAppContentSuccess = '[API - Puissance Game] get App Content Success',
  getAppContentFailed = '[API - Puissance Game] get App Content Failed',
  addNewPlayer = '[Add Player Page] Add new player',
  changePlayerTurn = '[Board Page] Change player player',
  decrementTokens = '[Board Page] Decrement Tokens',
  incrementScore = '[Board Page] Increment Score',
  resetTokens = '[Board Page] Reset Tokens',
};

export const getAppContent = createAction(
  PuissanceGameActionTypes.getAppContent
)


export const getAppContentSuccess = createAction(
  PuissanceGameActionTypes.getAppContent,
  props<{ payload: any }>()
);


export const getAppContentFailed = createAction(
  PuissanceGameActionTypes.getAppContent,
  props<{ payload: any }>()
);


export const addNewPlayer = createAction(
  PuissanceGameActionTypes.addNewPlayer,
  props<fromModels.AddPlayerRequest>()
);

export const changePlayerTurn = createAction(
PuissanceGameActionTypes.changePlayerTurn
);

export const decrementTokens = createAction(
  PuissanceGameActionTypes.decrementTokens,
  props<{id: number}>()
);

export const incrementScore = createAction(
  PuissanceGameActionTypes.incrementScore,
  props<{ id: number }>()
);

export const resetTokens = createAction(
  PuissanceGameActionTypes.resetTokens
);
