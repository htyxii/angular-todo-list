import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  completed: boolean = false;
  taskList: any[] = []
  newTodoForm = this.formBuilder.group({
    todoItem: ''
  })
    
  constructor(
    private formBuilder: FormBuilder
  ) { }
  
  

  addTask() {
    const value = this.newTodoForm.value.todoItem
    this.taskList.push({ id: this.taskList.length, name: value })
    window.localStorage.setItem('task', JSON.stringify(this.taskList))
    this.newTodoForm.reset();
    
  }

  removeTask(i: any) {
    this.taskList.splice(i, 1)
    window.localStorage.setItem('task', JSON.stringify(this.taskList))
    
  }

  markDone(value: any) {
    value.completed = !value.completed
    value.completed === true ?
      this.taskList.push(this.taskList.splice(this.taskList.indexOf(value), 1)[0]) :
      this.taskList.unshift(this.taskList.splice(this.taskList.indexOf(value), 1)[0])
      window.localStorage.setItem('task', JSON.stringify(this.taskList))
  }
  

  showAll() {
    this.taskList = window.localStorage.getItem('task') ? JSON.parse(localStorage.getItem('task')) : []
  }
  
  showOpen() {
    this.taskList = window.localStorage.getItem('task') ? JSON.parse(localStorage.getItem('task')) : []
    this.taskList = this.taskList.filter(task => task.completed !== true)
  }

  showDone() {
    this.taskList = window.localStorage.getItem('task') ? JSON.parse(localStorage.getItem('task')) : []
    this.taskList = this.taskList.filter(task => task.completed === true)
  }

  ngOnInit(): void {
    this.taskList = window.localStorage.getItem('task') ? JSON.parse(localStorage.getItem('task')) : []
  }

}
function todoItem(todoItem: any) {
  throw new Error('Function not implemented.');
}

