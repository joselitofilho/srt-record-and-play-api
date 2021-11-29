import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scenario } from '../../entities/scenario.entity';
import { ScenarioController } from './scenario.controller';
import { IScenarioService, ScenarioService } from './scenario.service';

@Module({
  controllers: [ScenarioController],
  providers: [{ provide: IScenarioService, useClass: ScenarioService }],
  imports: [TypeOrmModule.forFeature([Scenario])],
  exports: [TypeOrmModule],
})
export class ScenarioModule {}
