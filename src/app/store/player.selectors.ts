import { PlayerState, PuissanceGameState } from '@app/shared/models';
import { createSelector } from '@ngrx/store';

export const selectPlayer = (state: PuissanceGameState) => state.players;

export const selectPlayer1 = createSelector(
  selectPlayer,
  (state: PlayerState) => state.players[1]
);

export const selectPlayer2 = createSelector(
  selectPlayer,
  (state: PlayerState) => state.players[2]
);

export const selectTokens = createSelector(
  selectPlayer,
  (state: PlayerState) => state.players.map(players =>{
    return players.tokens
  })
);


export const isPlayersExist = createSelector(
  selectPlayer,
  (state:PlayerState) => Array.isArray(state.players) && state.players.length > 0
)

export const selectTurnState = createSelector(
  selectPlayer,
  (state: PlayerState) => state.turn
);

export const playerTurn = createSelector(
  selectPlayer,
  selectTurnState,
  (state: PlayerState, turn: number) => state.players.filter(state => state.id === turn)
);

