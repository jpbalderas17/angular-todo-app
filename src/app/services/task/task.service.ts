import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from 'src/app/interface/task';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private currentFilter = "";

  public tasks$ = new BehaviorSubject<Task>(null);
  public filter$ = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient) { }

  /**
   * retrieve list of task from api
   */
  refreshTasks(): void {
    this.filter$.subscribe((filter) => this.currentFilter = filter);

    const options = {
      params: new HttpParams().set('filter', this.currentFilter ? this.currentFilter : '')
    };

    this.http.get<Task>(`${environment.apiUrl}/`, options).subscribe((results) => {
      this.tasks$.next(results);
    });
  }

  /**
   * Toggle Task status from completed to to do
   * @param taskId Id of task to be updated
   */
  toggleTaskStatus(taskId: number): Observable<Object> {
    return this.http.post(`${environment.apiUrl}/toggle`, JSON.stringify({id: taskId}), this.httpOptions);
  }

  /**
   * Create new task
   * @param title title of task
   * @param description description of task
   */
  saveTask(title: string, description: string): Observable<Object> {
    return this.http.post(`${environment.apiUrl}/`, JSON.stringify({title: title, description: description}), this.httpOptions);
  }

  /**
   * Update task information
   * @param task task with updated values
   */
  updateTask(task: Task): Observable<Object> {
    return this.http.put(`${environment.apiUrl}/${task.id}`, JSON.stringify({title: task.title, description: task.description}), this.httpOptions);
  }

  /**
   * Delete task
   * @param taskId id to be deleted
   */
  deleteTask(taskId: number): Observable<Object> {
    return this.http.delete(`${environment.apiUrl}/${taskId}`);
  }

  /**
   * Update the current filter used 
   * @param filterString string used to filter by title
   */
  updateFilter(filterString: string): void {
    this.filter$.next(filterString);
    this.refreshTasks();
  }
}
