import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutohealingController } from './autohealing.controller';
import { Scenario } from 'src/entities/scenario.entity';
import {
  IScenarioService,
  ScenarioService,
} from '../scenario/scenario.service';

@Module({
  controllers: [AutohealingController],
  providers: [{ provide: IScenarioService, useClass: ScenarioService }],
  imports: [TypeOrmModule.forFeature([Scenario])],
  exports: [TypeOrmModule],
})
export class AutohealingModule {}
