import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromActions from '@app/store/player.actions';
import * as fromSelectors from '@app/store/player.selectors';
import {
  AddPlayerRequest,
  PlayerState,
  PuissanceGameState,
} from '@app/shared/models';
import { filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayersFacade {
  constructor(private store: Store<PuissanceGameState>) {}

  players$ = this.store.select(fromSelectors.selectPlayer);
  isPlayerExist$ = this.store.select(fromSelectors.isPlayersExist);
  playerTurn$ = this.store
    .select(fromSelectors.playerTurn)
    .pipe(filter((val) => val !== undefined));
  playersTokens$ = this.store.select(fromSelectors.selectTokens);

  addPlayer(players: AddPlayerRequest) {
    this.store.dispatch(fromActions.addNewPlayer(players));
  }

  changeTurn() {
    this.store.dispatch(fromActions.changePlayerTurn());
  }

  decrementToken(id: number) {
    this.store.dispatch(fromActions.decrementTokens({ id }));
  }

  incrementScore(id: number) {
    this.store.dispatch(fromActions.incrementScore({ id }));
  }

  resetTokens() {
    this.store.dispatch(fromActions.resetTokens());
  }
}
