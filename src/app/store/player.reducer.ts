import { createReducer, on } from '@ngrx/store';

import * as fromModels from '@app/shared/models';
import * as fromActions from '@app/store/player.actions';

export const initialState: fromModels.PlayerState = {
  players: [],
  turn: 1,
};

export const PlayerReducer = createReducer(
  initialState,
  on(
    fromActions.addNewPlayer,
    (state: fromModels.PlayerState, payload: fromModels.AddPlayerRequest) => {
      return {
        ...initialState,
        players: [
          {
            id: 1,
            name: payload.playerName1,
            score: 0,
            tokens: 21,
          },
          {
            id: 2,
            name: payload.playerName2,
            score: 0,
            tokens: 21,
          },
        ],
      };
    }
  ),
  on(fromActions.changePlayerTurn, (state: fromModels.PlayerState) => {
    return {
      ...state,
      turn: state.turn === 1 ? 2 : 1,
    };
  }),
  on(
    fromActions.decrementTokens,
    (state: fromModels.PlayerState, payload: Partial<fromModels.IPlayer>) => {
      return {
        ...state,
        players: state.players.map((player) =>
          player.id === payload.id
            ? { ...player, tokens: player.tokens - 1 }
            : player
        ),
      };
    }
  ),
  on(
    fromActions.incrementScore,
    (state: fromModels.PlayerState, payload: any) => {
      return {
        ...state,
        players: state.players.map((player) =>
          player.id === payload.id
            ? { ...player, score: player.score + 1 }
            : player
        ),
      };
    }
  ),
  on(fromActions.resetTokens, (state: fromModels.PlayerState) => {
    return {
      ...state,
      players: state.players.map((player) => ({
        ...player,
        tokens: 21,
      })),
    };
  })
);
