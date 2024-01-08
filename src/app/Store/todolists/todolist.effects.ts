import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as TodolistActions from './todolist.actions';
import { WorkspaceService } from 'src/app/workspace.service';

@Injectable()
export class TodolistEffects {
  loadTodoLists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodolistActions.loadTodoLists),
      switchMap(({ workspaceId, boardId }) =>
        this.workspaceService.getAllTodoLists(workspaceId, boardId).pipe(
          map(todolists => TodolistActions.loadTodoListsSuccess({ todolists })),
          catchError(error => of(TodolistActions.loadTodoListsFailure({ error })))
        )
      )
    )
  );

  addTodoList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodolistActions.addTodoList),
      switchMap(({ workspaceId, boardId, newTodoList }) =>
        this.workspaceService.addTodoList(workspaceId, boardId, newTodoList).pipe(
          map(() => TodolistActions.loadTodoLists({ workspaceId, boardId })), // Load todolists after adding a new one
          catchError(error => of(TodolistActions.loadTodoListsFailure({ error })))
        )
      )
    )
  );

  updateTodoList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodolistActions.updateTodoList),
      switchMap(({ workspaceId, boardId, todoListId, updatedTodoList }) =>
        this.workspaceService.updateTodoList(workspaceId, boardId, todoListId, updatedTodoList).pipe(
          map(() => TodolistActions.loadTodoLists({ workspaceId, boardId })), // Load todolists after updating
          catchError(error => of(TodolistActions.loadTodoListsFailure({ error })))
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
