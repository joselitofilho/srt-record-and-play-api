import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Action } from './action.entity';
import { ScenarioStatus } from './scenario-status.entity';

@Entity()
export class Scenario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  context: string;

  @Column({ default: false })
  isTemplate: boolean;

  @OneToMany(() => Action, (action) => action.scenario)
  actions: Action[];

  @OneToOne(() => ScenarioStatus, (status) => status.scenario, {
    cascade: true,
  })
  status: ScenarioStatus;
}
