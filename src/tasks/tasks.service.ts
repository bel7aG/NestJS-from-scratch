import { Injectable, NotFoundException } from '@nestjs/common'
import * as uuid from 'uuid'
import { Task, TaskStatus } from './tasks.model'
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks(): Task[] {
    return this.tasks
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status: taskStatus, search } = filterDto
    return this.tasks.filter(({ title, status }) => title.includes(search) || status === taskStatus)
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto

    const task: Task = {
      id: uuid().toString(),
      title,
      description,
      status: TaskStatus.OPEN,
    }

    this.tasks.push(task)

    return task
  }

  getTaskById(taskId: string): Task {
    const found = this.tasks.find(({ id }) => taskId === id)

    if (!found) {
      throw new NotFoundException(`Task with id "${taskId}" not found`)
    }

    return found
  }

  deleteTaskById(taskId: string): void {
    const found = this.getTaskById(taskId)
    this.tasks = this.tasks.filter(({ id }) => id !== found.id)
  }

  updateTaskStatus(taskId: string, status: TaskStatus): Task {
    const task = this.getTaskById(taskId)
    task.status = status
    return task
  }
}
