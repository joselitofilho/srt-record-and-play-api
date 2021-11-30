import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionModule } from './modules/action/action.module';
import { ScenarioModule } from './modules/scenario/scenario.module';

@Module({
  imports: [ScenarioModule, ActionModule, TypeOrmModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
