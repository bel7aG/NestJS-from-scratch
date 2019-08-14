import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { TaskStatus } from './tasks.model'

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn() // tells typeorm this is a primary key column and the id should be generated and incremented when we create a new task
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  status: TaskStatus
}
