import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IPlayer, PlayerState } from '@app/shared/models';
import { PlayersFacade } from '@app/store/player.facade';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-player-board',
  templateUrl: './player-board.component.html',
  styleUrls: ['./player-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerBoardComponent implements OnInit {
  constructor() {}
  @Input() players: IPlayer[];
  @Input() appContent: any

  ngOnInit(): void {}

}


