import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommonError, CustomError } from '@/error';
import config from '@/utils/config';

export enum HmacRole {
  Super = 'Super',
  Admin = 'Admin',
}

@Entity('hmac')
export default class Hmac extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ nullable: false })
  secret!: string;

  @Column({
    type: config.typeorm.url !== 'inmemory' ? 'enum' : 'text',
    enum: HmacRole,
    default: HmacRole.Admin,
  })
  role!: HmacRole;

  @Column({ type: 'timestamp', nullable: false })
  @CreateDateColumn()
  createdAt!: Date;

  @Column({ type: 'timestamp', nullable: false })
  @UpdateDateColumn()
  updatedAt!: Date;

  static findById(id: string) {
    return this.findOne({ id });
  }
  static async getById(id: string) {
    const entity = await this.findById(id);
    if (!entity) {
      throw new CustomError(CommonError.EntityNotFound);
    }
    return entity;
  }
}
