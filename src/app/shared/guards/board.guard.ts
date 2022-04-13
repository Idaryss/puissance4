import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { PlayersFacade } from '@app/store/player.facade';

@Injectable({
  providedIn: 'root',
})
export class BoardGuard implements CanActivate {
  isPlayers = false;
  constructor(private playersFacade: PlayersFacade, private route: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.playersFacade.isPlayerExist$.subscribe(isPlayersExist => {
       this.isPlayers = isPlayersExist;
     }
    );
    if (!this.isPlayers) {
      this.route.navigate(['addplayer']);
      return false;
    }
    return true;
  }
}
