import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { Task, TaskStatus } from './tasks.model'
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    return Object.keys(filterDto).length
      ? this.tasksService.getTasksWithFilters(filterDto)
      : this.tasksService.getAllTasks()
  }

  @Get(`/:id`)
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id)
  }

  @Post()
  @UsePipes(
    ValidationPipe,
    /* usepipes for createTask and ValidationPipe as paramater and nestjs is smart it will check our dto
        and check CreateTaskDto wish use class-validator to handle validations*/
  )
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto)
  }

  @Delete(`:id`)
  deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTaskById(id)
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status)
  }
}
