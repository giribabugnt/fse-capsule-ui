export class Task {
    taskId: number;
    task: string;
    parentId: number;
    parentTask: string;
    priority: number;
    startDate: string;
    endDate: string;
    taskOpen: string;
    hide: boolean;

    constructor(task: string, parentTask: string, priority: number, startDate: string, endDate: string) {
        this.task = task;
        this.parentTask = parentTask;
        this.priority = priority;
        this.startDate = startDate;
        this.endDate = endDate;
        this.taskOpen = 'Y';
    }
}