import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as BoardActions from './board.actions';
import { WorkspaceService } from 'src/app/workspace.service';

@Injectable()
export class BoardEffects {
  loadBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.loadBoards),
      switchMap(({ workspaceId }) =>
        this.workspaceService.getAllBoards(workspaceId).pipe(
          map(boards => BoardActions.loadBoardsSuccess({ boards })),
          catchError(error => of(BoardActions.loadBoardsFailure({ error })))
        )
      )
    )
  );

  addBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.addBoard),
      switchMap(({ workspaceId, newBoard }) =>
        this.workspaceService.addBoard(workspaceId, newBoard).pipe(
          map(() => BoardActions.loadBoards({ workspaceId })), // Load boards after adding a new one
          catchError(error => of(BoardActions.loadBoardsFailure({ error })))
        )
      )
    )
  );

  updateBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.updateBoard),
      switchMap(({ workspaceId, boardId, updatedBoard }) =>
        this.workspaceService.updateBoard(workspaceId, boardId, updatedBoard).pipe(
          map(() => BoardActions.loadBoards({ workspaceId })), // Load boards after updating
          catchError(error => of(BoardActions.loadBoardsFailure({ error })))
        )
      )
    )
  );

  // Add other effects for CRUD operations if needed

  constructor(
    private actions$: Actions,
    private workspaceService: WorkspaceService
  ) {}
}
