import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Scenario } from './scenario.entity';

@Entity()
export class ScenarioStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @OneToOne(() => Scenario, (scenario) => scenario.status)
  @JoinColumn()
  scenario: Scenario;
}
