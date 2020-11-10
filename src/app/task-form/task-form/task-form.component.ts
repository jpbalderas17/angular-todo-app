import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Task } from 'src/app/interface/task';
import { TaskService } from 'src/app/services/task/task.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      id: null,
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  /**
   * Send store or update request to api
   * @param taskData data to be sent to the api
   * @param formDirective pass so that errors can be reset
   */
  onSubmit(taskData: Task, formDirective: FormGroupDirective): void{
    if (!this.taskForm.valid) {
      return;
    }

    if (taskData.id) {
      // Update task
      this.taskService.updateTask(taskData).pipe(
        first()
      ).subscribe((res) => {
        this.taskService.refreshTasks();
      });
    } else {
      // Create New
      this.taskService.saveTask(taskData.title, taskData.description).pipe(
        first()
      ).subscribe((res) => {
        this.taskService.refreshTasks();
      });
    }

    formDirective.resetForm();
    this.taskForm.reset();
  }

}
