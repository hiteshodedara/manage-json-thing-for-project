import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  private DBurl = "http://localhost:3000/workspaces";

  constructor(private http: HttpClient) { }

  getAllWorkspaces(): Observable<any> {
    return this.http.get(this.DBurl);
  }

  getWorkspaceById(workspaceId: number): Observable<any> {
    return this.http.get(`${this.DBurl}/${workspaceId}`);
  }

  addWorkspace(newWorkspace: any): Observable<any> {
    return this.http.post(this.DBurl, newWorkspace);
  }
  deleteWorkspace(workspaceId: number): Observable<any>{
    return this.http.delete(`${this.DBurl}/${workspaceId}`);
  }

  updateWorkspace(workspaceId: number, updatedWorkspace: any): Observable<any> {
    return this.http.put(`${this.DBurl}/${workspaceId}`, updatedWorkspace);
  }

  getAllBoards(workspaceId: number): Observable<any> {
    return this.getWorkspaceById(workspaceId).pipe(
      map((workspace: any) => workspace.boards)
    );
  }

  getBoardById(workspaceId: number, boardId: number): Observable<any> {
    return this.getAllBoards(workspaceId).pipe(
      map((boards: any[]) => boards.find(board => board.id === boardId))
    );
  }

  addBoard(workspaceId: number, newBoard: any): Observable<any> {
    return this.http.post(`${this.DBurl}/${workspaceId}/boards`, newBoard);
  }

  updateBoard(workspaceId: number, boardId: number, updatedBoard: any): Observable<any> {
    return this.http.put(`${this.DBurl}/${workspaceId}/boards/${boardId}`, updatedBoard);
  }

  getAllTodoLists(workspaceId: number, boardId: number): Observable<any> {
    return this.getBoardById(workspaceId, boardId).pipe(
      map((board: any) => board.todolists)
    );
  }

  getTodoListById(workspaceId: number, boardId: number, todoListId: number): Observable<any> {
    return this.getAllTodoLists(workspaceId, boardId).pipe(
      map((todolists: any[]) => todolists.find(list => list.id === todoListId))
    );
  }

  addTodoList(workspaceId: number, boardId: number, newTodoList: any): Observable<any> {
    return this.http.post(`${this.DBurl}/${workspaceId}/boards/${boardId}/todolists`, newTodoList);
  }

  updateTodoList(workspaceId: number, boardId: number, todoListId: number, updatedTodoList: any): Observable<any> {
    return this.http.put(`${this.DBurl}/${workspaceId}/boards/${boardId}/todolists/${todoListId}`, updatedTodoList);
  }

  getAllTodos(workspaceId: number, boardId: number): Observable<any> {
    return this.getBoardById(workspaceId, boardId).pipe(
      map((board: any) => board.todos)
    );
  }

  getTodoById(workspaceId: number, boardId: number, todoId: number): Observable<any> {
    return this.getAllTodos(workspaceId, boardId).pipe(
      map((todos: any[]) => todos.find(todo => todo.id === todoId))
    );
  }

  addTodo(workspaceId: number, boardId: number, newTodo: any): Observable<any> {
    return this.http.post(`${this.DBurl}/${workspaceId}/boards/${boardId}/todos`, newTodo);
  }

  updateTodo(workspaceId: number, boardId: number, todoId: number, updatedTodo: any): Observable<any> {
    return this.http.put(`${this.DBurl}/${workspaceId}/boards/${boardId}/todos/${todoId}`, updatedTodo);
  }
}
