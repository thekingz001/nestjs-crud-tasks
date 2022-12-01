/**
 * Creating a Task Model (right now an interface, could be class later)
 */
import { MinLength } from 'class-validator';

export enum TaskStatus { 
  Pending = 'Pending', 
  Active = 'Active', 
  Finished = 'Finished'
};

export class CreateTaskDto { 
  /* DTOs need to be classes instead of interfaces in order 
   * for class-validator decorators to work! */
  /* Purpose of this is to make sure the body of the createTask request has
   * title, description, and numPeople */
  @MinLength(2) title: string
  @MinLength(5) description: string
  numPeople: number
}

export class Task extends CreateTaskDto {
  id: string
  status: TaskStatus
}
