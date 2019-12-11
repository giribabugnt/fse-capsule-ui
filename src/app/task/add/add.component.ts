import { Component, OnInit } from '@angular/core';
import { TaskService } from '../service/task.service';
import { Task } from '../model/Task';

@Component({
  selector: 'add-task',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  task: Task = new Task('', '', 0, '', '');

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  addTask() {
    const startDate = this.task.startDate.split('-');
    this.task.startDate = startDate[1] + '/' + startDate[2] + '/' + startDate[0];

    const endDate = this.task.endDate.split('-');
    this.task.endDate = endDate[1] + '/' + endDate[2] + '/' + endDate[0];

    this.taskService.addTask(this.task).subscribe(
      (response) => {
        this.task = new Task('', '', 0, '', '');
      },
      (error) => console.log(error)
    )
  }
}
