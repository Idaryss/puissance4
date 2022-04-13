import { ActionReducerMap } from "@ngrx/store";
import { PuissanceGameState } from '@app/shared/models/puissance-game-state.model';
import { PlayerReducer } from "./player.reducer";

export const reducers: ActionReducerMap<PuissanceGameState> = {
  players: PlayerReducer
}
