/**
 * A Controller is the routing logic of a server... it routes endpoints to providers
 */

import { Controller, Get, Post, Body, Delete, Param, Patch, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, CreateTaskDto, TaskStatus } from './tasks.model';

@Controller('tasks') // decorator factory that returns a custom decorator
export class TasksController {

  private tasksService: TasksService;

  constructor(tasksService: TasksService) {
    this.tasksService = tasksService;
  }

  /* In controllers, the REST/CRUD decorators (aka @Get, @Post) are 
  * the ones that tell the controller which methods to route to BASED ON
  * the HTTP request type */

  /* This is an example of a REST/CRUD decorator taking a query
   * The Query object is optional, but it'll come in form of {term: "<searchterm>"} in this case
   * Notice @Query decorating the parameter
   */
  @Get()
  getTasks(@Query('term') searchTerm: string): Task[] {
    return this.tasksService.getTasks(searchTerm);
  }

  /* This is an example of a REST/CRUD decorator taking an endpoint parameter
   * ALSO, notice the @Param in the arguments
   */
  @Get('/:id')
  getOneTaskById(@Param('id') id: string): Task {
    return this.tasksService.getOneTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskBody: CreateTaskDto):Task {
    /* By attaching a ValidationPipe to this method,
     * every parameter is checked against any Class-Validator that might exist for that param's type
     * (in this case, CreateTaskDto) */
    return this.tasksService.createTask(createTaskBody);
  }

  @Delete('/:id')
  deleteOneTaskById(@Param('id') id: string): Task {
    return this.tasksService.deleteOneTaskById(id);
  }

  @Patch('/:id')
  updateOneTaskStatus(
    @Param('id') id: string, 
    @Body('status') newStatus: TaskStatus,
  ): Task {
    return this.tasksService.updateOneTaskStatus(id, newStatus);
  }

  @Put('/:id')
  replaceOneTask(
    @Param('id') id: string,
    @Body(ValidationPipe) createTaskBody: CreateTaskDto,
  ): Task {
    /* Another ValidationPipe, but this time, applied as a PARAMETER PIPE (specific to a parameter) */
    return this.tasksService.replaceOneTask(id, createTaskBody);
  }
}
