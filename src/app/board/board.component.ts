import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '@app/services/api.service';
import { SnackBarComponent } from '@app/shared/components/snackbar/snackbar.component';
import { TieDialogComponent } from '@app/shared/components/tie-dialog.component';
import { NUMBER_OF_COLUMN, NUMBER_OF_ROW } from '@app/shared/constants';
import { IPlayer, PlayerState } from '@app/shared/models';
import { PlayersFacade } from '@app/store/player.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  constructor(
    private playerFacade: PlayersFacade,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private apiService: ApiService
  ) {}

  appContent: any;
  playerTurnLabel: string;
  rowsNb: number = NUMBER_OF_ROW;
  columnsNb: number = NUMBER_OF_COLUMN;
  rowsTable = new Array(this.rowsNb);
  columnsTable = new Array(this.columnsNb);
  players$: Observable<PlayerState> = this.playerFacade.players$;
  playerTurn: IPlayer;
  moves = 0;
  checkCell: any;
  @ViewChild('gameBoard') gameBoard: ElementRef;

  ngOnInit(): void {
    this.whichTurn();
    this.getAppContent();
  }

  getAppContent() {
    this.apiService.appContent$
      .pipe(untilDestroyed(this))
      .subscribe((appContent) => {
        this.appContent = appContent;
      });
  }

  // PlayerTurn Subscription
  whichTurn() {
    this.playerFacade.playerTurn$
      .pipe(
        map((playerTurn) => playerTurn[0]),
        untilDestroyed(this)
      )
      .subscribe((playerTurn) => {
        this.playerTurn = playerTurn;
        this.getAppContent();
      });
  }

  /**
   *
   * @param {HTMLDivElement } gameBoard Template reference of the node table
   * @param {number} columnindex the index of the collumn
   */
  onClick(gameBoard: HTMLDivElement, columnindex: number) {
    this.checkAvailableCell(gameBoard, columnindex);
  }

  /**
   * This function is to check if a cell is available in the selected coluMN
   * @param {number} row the index of the row
   * @param {HTMLDivElement} gameBoard template reference of the node table
   * @param {number} columnindex the index of the collumn
   */
  checkAvailableCell(gameBoard, columnindex) {
    let row: number;
    for (let i = this.rowsNb - 1; i >= 0; i--) {
      this.checkCell = gameBoard.children[i].children[columnindex].children[0];
      if (
        this.checkCell &&
        this.checkCell.nodeName === 'DIV' &&
        this.checkCell.classList.contains('free-cell')
      ) {
        row = i;
        break;
      }
    }
    // if row is undefined no class of free-cell has been found in the collumn
    if (row === undefined) {
      this.colummIsFull();
    } else {
      // if row is assigned then add the class of the player active
      this.assignTokenToBoard(gameBoard, row, columnindex);
    }
  }

  /**
   * This function is to assign right token to the cells
   *
   * @param {HTMLDivElement} gameBoard The gameBoard template reference
   * @param {number} row The index of the row
   * @param {number }columnindex The index of the column
   * @returns
   */
  assignTokenToBoard(
    gameBoard: HTMLDivElement,
    row: number,
    columnindex: number
  ) {
    this.checkCell.classList.remove('free-cell');
    this.checkCell.classList.add(`user${this.playerTurn?.id}Selected`);
    if (this.isWinner(gameBoard, row, columnindex)) {
      return;
    } else {
      this.playerFacade.decrementToken(this.playerTurn?.id!);
      this.playerFacade.changeTurn();
      this.moves === this.rowsNb * this.columnsNb - 1
        ? this.gameIsTie()
        : this.moves++;
    }
  }

  isWinner(gameBoard: HTMLDivElement, row: number, column: number) {
    // Check if there is 4 connected tokens Horizontal
    let count = 0;
    for (let j = 0; j < this.columnsNb; j++) {
      const checkHorizontal = gameBoard.children[row].children[j].children[0];
      count = checkHorizontal.classList.contains(
        `user${this.playerTurn.id}Selected`
      )
        ? count + 1
        : 0;
      if (count >= 4) {
        this.gameWinner('horizontal');
      }
    }
    // Check if there is 4 connected tokens Vertical
    count = 0;
    for (let i = 0; i < this.rowsNb; i++) {
      const checkVertial = gameBoard.children[i].children[column].children[0];
      count = checkVertial.classList.contains(
        `user${this.playerTurn?.id}Selected`
      )
        ? count + 1
        : 0;
      if (count >= 4) {
        this.gameWinner('vertical');
      }
    }
    // Check Diagonal Left
    count = 0;
    let diagonal = row - column;
    for (
      let i = Math.max(diagonal, 0);
      i < Math.min(this.rowsNb, this.columnsNb + diagonal);
      i++
    ) {
      const checkDiagonalLeft =
        gameBoard.children[i].children[i - diagonal].children[0];
      count = checkDiagonalLeft.classList.contains(
        `user${this.playerTurn?.id}Selected`
      )
        ? count + 1
        : 0;
      if (count >= 4) {
        this.gameWinner('diagonal');
      }
    }
    // Check Diagonal Right
    count = 0;
    diagonal = row + column;

    for (
      let i = Math.max(diagonal - this.columnsNb + 1, 0);
      i < Math.min(this.rowsNb, diagonal + 1);
      i++
    ) {
      const checkDiagonalRight =
        gameBoard.children[i].children[diagonal - i].children[0];
      count = checkDiagonalRight.classList.contains(
        `user${this.playerTurn?.id}Selected`
      )
        ? count + 1
        : 0;
      if (count >= 4) {
        this.gameWinner('diagonal');
      }
    }

    return false;
  }

  colummIsFull() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 1000,
    });
  }

  gameIsTie() {
    const dialogRef = this.dialog.open(TieDialogComponent, {
      width: '250px',
      data: {
        title: this.appContent.GAME_TIE.TITLE,
        content: this.appContent.GAME_TIE.TITLE.CONTENT,
        button: this.appContent.GAME_TIE.BUTTON,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.resetGame();
    });
  }

  gameWinner(message: string) {
    this.playerFacade.incrementScore(this.playerTurn.id);
    const dialogRef = this.dialog.open(TieDialogComponent, {
      width: '400px',
      data: {
        title:
          this.playerTurn.name + this.appContent.GAME_WINNER_MODAL + message,
        content: this.appContent.GAME_WINNER.CONTENT,
        button: this.appContent.GAME_WINNER.BUTTON,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.resetGame();
    });
  }

  resetGame() {
    this.moves = 0;
    this.playerFacade.resetTokens();
    for (let i = 0; i < this.gameBoard.nativeElement.children.length; i++) {
      const board = this.gameBoard.nativeElement.children[i].children;
      for (let j = 0; j < board.length; j++) {
        if (board[j].children[0].classList) {
          board[j].children[0].className = '';
          board[j].children[0].classList.add('free-cell');
        }
      }
    }
  }
}
