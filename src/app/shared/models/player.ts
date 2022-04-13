export interface IPlayer {
  id: number;
  name: string;
  score: number;
  tokens: number;
}

export interface AddPlayerRequest {
  playerName1: string;
  playerName2: string;
}
