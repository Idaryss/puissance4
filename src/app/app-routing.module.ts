import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPlayerComponent } from './add-player/add-player.component';
import { BoardComponent } from './board/board.component';
import { BoardGuard } from './shared/guards/board.guard';

const routes: Routes = [
  { path: 'addplayer', component: AddPlayerComponent },
  { path: '', redirectTo: 'addplayer', pathMatch: 'full' },
  {
    path: 'board',
    component: BoardComponent,
    canActivate: [BoardGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
