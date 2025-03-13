import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity()
export class BaseEntity {
  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @Column({ type: 'bigint' })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: Date;

  @Column({ type: 'bigint' })
  updatedBy: string;
}
