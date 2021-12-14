import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Action } from '../../entities/action.entity';

export abstract class IActionService {
  abstract saveMany(actions: Action[]): Promise<Action[]>;
  abstract delete(id: number): Promise<Action>;
}

export class ActionService extends IActionService {
  constructor(
    @InjectRepository(Action)
    private actionRepository: Repository<Action>,
  ) {
    super();
  }

  async saveMany(actions: Action[]): Promise<Action[]> {
    const insertion = await this.actionRepository
      .createQueryBuilder()
      .insert()
      .into(Action)
      .values(actions)
      .execute();

    const ids = insertion.identifiers;

    return actions.map((action, index) =>
      Object.assign(action, { id: ids[index].id }),
    );
  }

  async delete(id: number): Promise<Action> {
    const deleteAction = await this.actionRepository.findOne(id);
    if (!deleteAction) return null;
    await this.actionRepository.remove(deleteAction);
    return deleteAction;
  }
}
