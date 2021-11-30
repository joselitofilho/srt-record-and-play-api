import {
  ChildEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { Scenario } from './scenario.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class ActionData {
  @PrimaryGeneratedColumn()
  id: string;
}

@ChildEntity()
export class ActionDataUrl extends ActionData {
  @Column()
  url: string;
}

@ChildEntity()
export class ActionDataElement extends ActionData {
  @Column()
  by: string;

  @Column()
  element: string;

  @Column()
  element_type: string;

  @Column()
  element_name: string;

  @Column()
  text: string;

  @Column()
  key: string;
}

@Entity()
export class Action {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Scenario, (scenario) => scenario.actions)
  scenario: Scenario;

  @Column()
  type: string;

  @Column()
  category: string;

  @OneToOne(() => ActionData, { cascade: true })
  @JoinColumn()
  data: ActionData;
}
