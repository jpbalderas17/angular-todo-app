import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './interface/task';
import { TaskService } from './services/task/task.service';
import { TaskFormComponent } from './task-form/task-form/task-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  @ViewChild(TaskFormComponent) private taskFormComponent: TaskFormComponent;

  tasks$: Observable<Task>;
  currentFilter = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks$ = this.taskService.tasks$;
    this.taskService.refreshTasks();
  }

  /**
   * Update form data using task
   * @param task task value to be used for form data
   */
  editTask(task: Task): void {
    this.taskFormComponent.taskForm.setValue({
      id: task.id,
      title: task.title,
      description: task.description
    });
  }

  /**
   * Mark task as completed or to do
   * @param taskId id of the task to be updated
   */
  uppdateTaskStatus(taskId: number): void {
    this.taskService.toggleTaskStatus(taskId).subscribe(()=> this.taskService.refreshTasks());
  }

  /**
   * Delete to do from list
   * @param taskId id of the task to be updated
   */
  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(()=> this.taskService.refreshTasks());
  }

  /**
   * Update current filter
   */
  updateFilter() {
    this.taskService.updateFilter(this.currentFilter);
  }
}
