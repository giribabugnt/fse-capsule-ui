import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../model/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  getUrl: string = "http://localhost:8081/task-manager/v1/tasks";
  addUrl: string = "http://localhost:8081/task-manager/v1/add-task";
  updateUrl: string = "http://localhost:8081/task-manager/v1/update-task";
  
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');

  constructor(private httpClient: HttpClient) { }

  getTasks() {
    return this.httpClient.get<Task[]>(this.getUrl);
  }

  addTask(task: Task) {
    return this.httpClient.post<Task>(this.addUrl, task, { headers: this.headers });
  }

  updateTask(task: Task) {
    return this.httpClient.post<Task>(this.updateUrl, task, { headers: this.headers });
  }
}
