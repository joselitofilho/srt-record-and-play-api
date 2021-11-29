import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scenario } from '../../entities/scenario.entity';

@Injectable()
export abstract class IScenarioService {
  abstract findAll(): Promise<Scenario[]>;
  abstract findOneWithRelations(id: number): Promise<Scenario>;
  abstract save(scenario: Scenario): Promise<Scenario>;
}

export class ScenarioService extends IScenarioService {
  constructor(
    @InjectRepository(Scenario)
    private scenarioRepository: Repository<Scenario>,
  ) {
    super();
  }

  findAll(): Promise<Scenario[]> {
    return this.scenarioRepository.find({ relations: ['status'] });
  }

  findOneWithRelations(id: number): Promise<Scenario> {
    return this.scenarioRepository.findOne(id, {
      relations: ['status', 'actions'],
    });
  }

  save(scenario: Scenario): Promise<Scenario> {
    return this.scenarioRepository.save(scenario);
  }
}
