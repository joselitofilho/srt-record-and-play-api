import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScenarioModule } from '../scenario/scenario.module';
import { AutohealingController } from './autohealing.controller';

@Module({
  controllers: [AutohealingController],
  providers: [],
  imports: [ScenarioModule],
  exports: [TypeOrmModule],
})
export class AutohealingModule {}
