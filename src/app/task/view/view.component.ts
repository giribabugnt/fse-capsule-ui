import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../model/Task';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'view-task',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  @Input() tasks: Task[];

  task: string;
  parentTask: string;
  priorityFrom: number = 0;
  priorityTo: number = 30;
  startDate: string;
  endDate: string;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.taskService.getTasks().subscribe(
      (response) => {
        this.tasks = response;
      },
      (error) => console.log(error)
    )
  }

  filterTasks() {
    this.tasks.forEach(task => {
      task.hide = !(task.priority >= this.priorityFrom && task.priority <= this.priorityTo);

      if (!task.hide && this.task != null && this.task != '')
        task.hide = (task.task != this.task);

      if (!task.hide && this.parentTask != null && this.parentTask != '')
        task.hide = (task.parentTask != this.parentTask);

      if (!task.hide && this.startDate != null && this.startDate != '') {
        let inpStartDate = this.parsePickerDate(this.startDate);
        let taskStartDate = this.parseDisplayDate(task.startDate);

        task.hide = !(taskStartDate >= inpStartDate);
      }

      if (!task.hide && this.endDate != null && this.endDate != '') {
        let inpEndDate = this.parsePickerDate(this.endDate);
        let taskEndDate = this.parseDisplayDate(task.endDate);

        task.hide = !(taskEndDate <= inpEndDate);
      }
    });
  }

  parsePickerDate(strDate: String): Date {

    const str = strDate.split('-');
    const year = Number(str[0]);
    const month = Number(str[1]) - 1;
    const date = Number(str[2]);

    return new Date(year, month, date);
  }

  parseDisplayDate(strDate: String): Date {

    const str = strDate.split('/');
    const year = Number(str[2]);
    const month = Number(str[0]) - 1;
    const date = Number(str[1]);

    return new Date(year, month, date);
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task).subscribe(
      (response) => {
      },
      (error) => console.log(error)
    )
  }

  endTask(task: Task) {
    task.taskOpen = 'N';
    this.taskService.updateTask(task).subscribe(
      (response) => {
      },
      (error) => console.log(error)
    )
  }
}
