import { Component } from '@angular/core';
import {Todo} from "../models/todo";
import {FormsModule} from "@angular/forms";
import {NgClass, NgFor, NgIf} from "@angular/common";
import {TodoService} from "../service/todo.service";

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, NgClass],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent {
  todos: Todo[] = [];
  inputValue = '';
  ongoingEditing = false;

  constructor(private todoService: TodoService) {
  this.fetchTodos()
  }


  onAdd() {
    if(this.inputValue){
      let todo: Todo = {description: this.inputValue, completed: false,isEditing: false};
      this.inputValue = ''
      this.todoService.onAdd(todo)
      this.fetchTodos()
    }
  }

  onDelete(index: number){
    if(confirm("Are you sure?")){
      if(confirm('Are you really sure ?')) {
        this.todoService.delete(index)
        this.fetchTodos()
      }
    }

  }

  onEdit(index: number,) {
    this.todos[index].isEditing = true;
  }
  onSave(index: number,value: string ){
    this.todos[index].description = value
    this.todos[index].isEditing = false
    this.ongoingEditing = false
    this.todoService.save(index,this.todos[index])
    this.fetchTodos()
  }
  onCancel(index: number ){
    this.todos[index].isEditing = false;
    this.todos[index] = {...this.todos[index]}
  }
  deleteAll(){
    if(confirm('Are you sure?')) {
      if(confirm('Are you really sure ?')) {
        if(confirm('Are you really really sure ?')) {
          this.todoService.deleteAll()
          this.fetchTodos()
        }
      }
    }
  }
  fetchTodos(){
    this.todos = this.todoService.getAll()
  }
}
