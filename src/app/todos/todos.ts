import { Component, inject, OnInit, signal } from '@angular/core';
import { TodoService } from '../services/todos';
import { Todo } from '../model/todos.type';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matDeleteOutline, matCheck, matClose, matExitToApp, matSearch } from '@ng-icons/material-icons/baseline';
import { matAddCircleOutlineOutline } from '@ng-icons/material-icons/outline';

enum Modes {
  default,
  write,
  delete,
  search,
}

@Component({
  selector: 'app-todos',
  imports: [NgIcon],
  templateUrl: './todos.html',
  styleUrl: './todos.css',
  providers: [TodoService, provideIcons({ matDeleteOutline, matAddCircleOutlineOutline, matCheck, matClose, matExitToApp, matSearch })]
})
export class Todos implements OnInit {

  Modes = Modes; 

  filtertext = signal("");

  currentMode = signal(Modes.default);

  todoService = inject(TodoService);

  todoItems = signal<Array<Todo>>([]);

  newTodoInputText = signal("");

  createNewTodo(title: string): void {
    if (title.length != 0) {
      this.todoService.createTodo(this.todoItems(), title);
      this.newTodoInputText.set('');
      this.currentMode.set(Modes.default);
    }
  }

  onNewTodoSubmit(event: Event): void {
    event.preventDefault();
    this.createNewTodo(this.newTodoInputText());
  }


  checkTodo(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.todoService.checkTodo(this.todoItems(), input.name, input.checked);
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(this.todoItems(), id);
  }

  ngOnInit(): void {
    this.todoItems.set(this.todoService.loadTodosFromLocalStorage())
  }
}
