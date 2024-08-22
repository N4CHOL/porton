import bcrypt from 'bcrypt';
import { AutoIncrement, BeforeCreate, BeforeUpdate, Column, HasMany, HasOne, Model, PrimaryKey, Table, Unique, DataType, DefaultScope, Scopes, BelongsToMany } from 'sequelize-typescript';
import { Profile } from '../../profile/models/profile.model';
import { Access } from './access.model';
import { IRole, Role } from './role.model';
import { Session } from './session.model';
import { UserRole } from './user-role.model';
import { UserStatus } from './user-status.model';
import { Sequelize } from 'sequelize';

export interface IUser {
  userId?: number;
  username: string;
  name: string;
  lastName: string;
  cargo: string;
  phone: string;
  password: string;
  email: string;
  activated: boolean;
  visible?: boolean;
  roles?: IRole[];
  codeArea?:string;
}

@DefaultScope(() => ({
  where: {
    visible: true
  }, include: [
    Role
  ]
}))
@Scopes(() => ({
  'all-left':{
    include:[{
      model: Role,
    }]
  },
  

  'basic': {
    attributes: ['username', 'password', 'email', 'activated', 'visible', 'phone', 'cargo', 'lastName', 'codeArea', 'name'],
    include: [
      {
        model: Role,
        required: true
      }
    ]
  },

  'all': {
    attributes: ['username', 'email', 'activated', 'visible', 'phone', 'cargo', 'lastName', 'codeArea', 'name'],
    include: [
      {
        model: Role,
        required: true,
        include: [
          {
            model: Access,
            required: true
          }
        ]
      }
    ]
  },
  'only-operators': {
    attributes: ['userId','username', 'email', 'activated', 'visible', 'phone', 'cargo', 'lastName', 'codeArea', 'name'],
    include: [
      {
        model: Role,
        required: true,
        where: { name: 'Operario'}
      }
    ],
    where: { activated: true}
  }
}
))

@Table
export class User extends Model implements IUser {

  @AutoIncrement
  @PrimaryKey
  @Column(DataType.BIGINT)
  public userId!: number;

  @Unique
  @Column
  public username!: string;

  @Column
  public name!: string;
  @Column

  public password!: string;

  @Column
  public lastName!: string;

  @Column
  public codeArea!: string;

  @Column
  public phone!: string;

  @Column
  public cargo!: string;

  @Unique
  @Column
  public email!: string;

  @Column
  public activated!: boolean;

  @Column
  public visible!: boolean;

  @HasOne(() => Profile, 'userProfileFk')
  public profile!: Profile;

  @HasOne(() => UserStatus, 'userStatusId')
  public status!: UserStatus;

  @HasMany(() => Session, 'sessionId')
  public sessions!: Session[];

  @BelongsToMany(() => Role, () => UserRole)
  public roles!: Role[];

  @BeforeCreate
  @BeforeUpdate
  static encryptPassword(instance: User) {
    if (instance.changed('password')) {
      instance.password = bcrypt.hashSync(instance.password, 10);
    }
  }

  comparePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }

}