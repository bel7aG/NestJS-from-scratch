import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status: taskStatus, search } = filterDto;
    return this.tasks.filter(
      ({ title, status }) => title.includes(search) || status === taskStatus,
    );
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid().toString(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  getTaskById(taskId: string): Task {
    return this.tasks.find(({ id }) => taskId === id);
  }

  deleteTaskById(taskId: string): void {
    this.tasks = this.tasks.filter(({ id }) => taskId !== id);
  }

  updateTaskStatus(taskId: string, status: TaskStatus): Task {
    const pickedTask = this.getTaskById(taskId);
    pickedTask.status = status;
    return pickedTask;
  }
}
