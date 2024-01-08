export interface Workspace {
    id?: number;
    title: string;
    description: string;
    boards: Board[];
  }
  
  export interface Board {
    id?: number;
    title: string;
    todolists: Todolist[];
    todos: Todo[];
    isFavarate: boolean;
  }
  
  export interface Todolist {
    id?: number;
    key: string;
    name: string;
    isarchive: boolean;
    index: number;
  }
  
  export interface Todo {
    id?: number;
    key: string;
    title: string;
    discription: string;
    assigneduser: User;
    todocreater: User;
  }
  
  export interface User {
    id?: number;
    name: string;
  }
  