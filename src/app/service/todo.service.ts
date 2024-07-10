import { Injectable } from '@angular/core';
import {Todo} from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  getAll(): Todo[]{
    return JSON.parse(localStorage.getItem('todoItems')??'[]')

  }
  setAll(todos: Todo[]){
    localStorage.setItem('todoItems', JSON.stringify(todos))
  }
  onAdd(todo: Todo){
    const todos = this.getAll()
    todos.unshift(todo)
    localStorage.setItem('todoItems',JSON.stringify(todos))
  }
  delete(index: number){
    const todos = this.getAll()
    todos.splice(index,1)
    localStorage.setItem('todoItems',JSON.stringify(todos))
  }
  save(index: number,todo:Todo){
    const todos = this.getAll()
    todos[index]= todo
    localStorage.setItem('todoItems',JSON.stringify(todos))
  }
  deleteAll(){
    localStorage.removeItem('todoItems')
  }
}
