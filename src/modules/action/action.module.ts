import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Action } from '../../entities/action.entity';
import { ActionController } from './action.controller';
import { ActionService, IActionService } from './action.service';

@Module({
  controllers: [ActionController],
  providers: [{ provide: IActionService, useClass: ActionService }],
  imports: [TypeOrmModule.forFeature([Action])],
  exports: [TypeOrmModule],
})
export class ActionModule {}
