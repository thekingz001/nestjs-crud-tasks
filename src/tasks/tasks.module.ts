/**
 * A Module is the highest-level organization item in NestJS.  
 * Think of it as folders for different functional areas in an application
 * eg: For a Forum:
 *    ForumModule
 *        PostModule
 *        CommentModule
 *        AuthModule
 */

import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({  
  /* decorator factory that returns a custom decorator 
   * with controllers, providers, imports, exports passed in */
  controllers: [TasksController], // what controllers to import?
  providers: [TasksService] // what providers to import?
})
export class TasksModule {}
