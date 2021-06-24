import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '@models/user.model';
import { TOKENTYPE } from '@enums';
import { TokenType } from '@types';

@Entity()
export class RefreshToken {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @OneToOne(type => User, {
    eager : true,
    onDelete: 'CASCADE' // Remove refresh-token when user is deleted
   })
  @JoinColumn()
  user: User;

  @Column()
  expires: Date;

  @Column()
  blacklisted: boolean;

  @Column({
    type: 'enum',
    enum: TOKENTYPE
  })
  type: TokenType;

  /**
   *
   * @param token
   * @param user
   * @param expires
   */
  constructor(token: string, user: User, expires: Date, type: TokenType) {
    this.token = token;
    this.expires = expires;
    this.user = user;
    this.blacklisted = false;
    this.type = type;
  }
}