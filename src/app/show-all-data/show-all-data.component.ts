import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../Store/app.state';
import { selectWorkspaces } from '../Store/workspaces/workspace.selectors';
import { selectBoards } from '../Store/boards/board.selectors';
import { selectTodolists } from '../Store/todolists/todolist.selectors';
import { selectTodos } from '../Store/todos/todo.selectors';
import { loadWorkspaces } from '../Store/workspaces/workspace.actions';
import { loadBoards } from '../Store/boards/board.actions';
import { loadTodoLists } from '../Store/todolists/todolist.actions';
import { loadTodos } from '../Store/todos/todo.actions';

@Component({
  selector: 'app-show-all-data',
  templateUrl: './show-all-data.component.html',
  styleUrls: ['./show-all-data.component.sass']
})
export class ShowAllDataComponent implements OnInit {
  workspaces$ = this.store.select(selectWorkspaces);
  boards$ = this.store.select(selectBoards);
  todolists$ = this.store.select(selectTodolists);
  todos$ = this.store.select(selectTodos);

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    // Dispatch actions to load data when the component is initialized
    this.store.dispatch(loadWorkspaces());
    this.store.dispatch(loadBoards({ workspaceId: 1 })); // Replace 1 with the actual workspaceId
    this.store.dispatch(loadTodoLists({ workspaceId: 1, boardId: 1 })); // Replace with actual workspaceId and boardId
    this.store.dispatch(loadTodos({ workspaceId: 1, boardId: 1 })); // Replace with actual workspaceId and boardId
  }
}
