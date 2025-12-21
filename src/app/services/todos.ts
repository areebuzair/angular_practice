import { Injectable } from '@angular/core';
import { Todo } from '../model/todos.type';

@Injectable()
export class TodoService {

  saveTodosToLocalStorage(todos: Todo[]): void {
    try {
      const json = JSON.stringify(todos);
      localStorage.setItem("TODOS", json);
    } catch (error) {
      console.error("Failed to save todos to localStorage:", error);
    }
  }

  loadTodosFromLocalStorage(): Todo[] {
    try {
      const json = localStorage.getItem("TODOS");
      if (!json) return [];
      return JSON.parse(json) as Todo[];
    } catch (error) {
      console.error("Failed to load todos from localStorage:", error);
      return [];
    }
  }

  createTodo(array: Array<Todo>, title: string) {
    let newTodo: Todo = {
      id: new Date().toISOString(),
      title,
      isCompleted: false,
    }
    array.unshift(newTodo);
    this.saveTodosToLocalStorage(array);
    return newTodo;
  }

  updateTodo(array: Array<Todo>, id: string, title: string) {
    const index = array.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error("Item not found");
    }

    array[index] = {
      ...array[index],
      title
    };
    this.saveTodosToLocalStorage(array);
    return array[index];
  }

  checkTodo(array: Array<Todo>, id: string, isCompleted: boolean) {
    const index = array.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error("Item not found");
    }

    array[index] = {
      ...array[index],
      isCompleted
    };
    this.saveTodosToLocalStorage(array);
    return array[index];
  }

  deleteTodo(array: Array<Todo>, id: string) {
    const index = array.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error("Item not found");
    }
    let elem = array.splice(index, 1);
    this.saveTodosToLocalStorage(array);
    return elem[0];
  }

}
