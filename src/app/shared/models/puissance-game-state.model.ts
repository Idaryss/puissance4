import { IPlayer } from "./player";

export interface PuissanceGameState {
  players: PlayerState;
}

export interface PlayerState {
  players: IPlayer[],
  turn: number;
}
