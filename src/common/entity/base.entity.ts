import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @Column({ type: 'bigint' })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: Date;

  @Column({ type: 'bigint' })
  updatedBy: string;
}
