import { PrismaClientService } from '@project/models';
import { Entity, StorableEntity, EntityFactory } from '@project/shared/core';
import { Repository } from './repository.interface';

export abstract class BasePostgresRepository<
  T extends Entity & StorableEntity<ReturnType<T['toPOJO']>>,
  DocumentType = ReturnType<T['toPOJO']>
> implements Repository<T> {

  protected constructor(
    protected entityFactory: EntityFactory<T>,
    protected readonly client: PrismaClientService,
  ) {
    this.createEntityFromDocument = this.createEntityFromDocument.bind(this);
  }

  protected createEntityFromDocument(document: DocumentType): T | null {
    if (! document) {
      return null;
    }

    return this.entityFactory.create(document as ReturnType<T['toPOJO']>);
  }

  public async findAll(): Promise<T[]> {
    throw new Error('Not implemented');
  }

  public async findById(id: T['id']): Promise<T> {
    throw new Error('Not implemented');
  }

  public async save(entity: T): Promise<void> {
    throw new Error('Not implemented');
  }

  public async update(entity: T): Promise<void> {
    throw new Error('Not implemented');
  }

  public async deleteById(id: T['id']): Promise<void> {
    throw new Error('Not implemented');
  }
}
