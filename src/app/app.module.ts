import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { HeaderComponent } from './header/header.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayerReducer } from './store/player.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { BoardComponent } from './board/board.component';
import { PlayerBoardComponent } from './board/player-board.component.ts/player-board.component';
import { BoardGuard } from './shared/guards/board.guard';
import { TieDialogComponent } from './shared/components/tie-dialog.component';
import { AngularMaterialModule } from './shared/angular-material.module';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { placeholderReplacePipe } from './shared/pipes/placeholder-replace.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddPlayerComponent,
    BoardComponent,
    PlayerBoardComponent,
    TieDialogComponent,
    placeholderReplacePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    StoreModule.forRoot({ players: PlayerReducer }),

    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [BoardGuard, ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
