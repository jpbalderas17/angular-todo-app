import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../interface/task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {

  @Input() task: Task;
  @Output('editTask') editTaskEvent = new EventEmitter<Task>();
  @Output('updateTaskStatus') updateTaskStatusEvent = new EventEmitter<Number>();
  @Output('deleteTask') deleteTaskEvent = new EventEmitter<Number>();

  constructor() { }

  /**
   * Use selected task in task form
   * @param task task to be udpated
   */
  editTask(task: Task): void {
    this.editTaskEvent.emit(task);
  }

  /**
   * Emit the task to be deleted
   * @param task task to be deleted
   */
  deleteTask(taskId: number): void {
    this.deleteTaskEvent.emit(taskId);
  }

  /**
   * Emit the id of the task
   * @param taskId id of the task to be udpated
   */
  toggleTaskStatus(taskId: number): void{
    this.updateTaskStatusEvent.emit(taskId);
  }
}
