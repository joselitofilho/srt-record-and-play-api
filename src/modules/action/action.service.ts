import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Action } from '../../entities/action.entity';

export abstract class IActionService {
  abstract save(action: Action): Promise<Action>;
  abstract delete(id: number): Promise<Action>;
}

export class ActionService extends IActionService {
  constructor(
    @InjectRepository(Action)
    private actionRepository: Repository<Action>,
  ) {
    super();
  }

  async save(action: Action): Promise<Action> {
    return this.actionRepository.save(action);
  }

  async delete(id: number): Promise<Action> {
    const deleteAction = await this.actionRepository.findOne(id);
    if (!deleteAction) return null;
    await this.actionRepository.remove(deleteAction);
    return deleteAction;
  }
}
