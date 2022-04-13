import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@app/services/api.service';
import { PlayerState } from '@app/shared/models';
import { PlayersFacade } from '@app/store/player.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, Observable, take } from 'rxjs';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
})
@UntilDestroy()
export class AddPlayerComponent implements OnInit {
  appContent: any;
  players$: Observable<PlayerState> = this.playerFacade.players$;
  playerForm: FormGroup = this.formBuilder.group({
    playerName1: [null, [Validators.required]],
    playerName2: [null, Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private playerFacade: PlayersFacade,
    private route: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
        this.apiService.appContent$
          .pipe(untilDestroyed(this)
          )
          .subscribe((appContent) => {
            this.appContent = appContent;
          });
  }

  onAddPlayer(event: Event) {
    event.preventDefault();
    this.playerFacade.addPlayer(this.playerForm.value);
    this.route.navigate(['board']);
  }
}
