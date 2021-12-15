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
  runStatus: string;

  @Column()
  autoHealingStatus: string;

  @Column({ type: 'text' })
  autoHealingResponse: string;

  @OneToOne(() => Scenario, (scenario) => scenario.status)
  @JoinColumn()
  scenario: Scenario;
}
