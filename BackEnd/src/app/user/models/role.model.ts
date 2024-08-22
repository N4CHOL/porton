import { Table, Column, Model, Index, PrimaryKey, AutoIncrement, AllowNull, DataType, BelongsToMany } from 'sequelize-typescript';
import { Access, IAccess } from './access.model';
import { RoleAccess } from './role-access.model';
import { UserRole } from './user-role.model';
import { IUser, User } from './user.model';

export interface IRole {
    roleId?: number;
    name: string;
    users?: IUser[];
    accesses?: IAccess[];
}

@Table
export class Role extends Model implements IRole {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    public roleId!: number;

    @AllowNull(false)
    @Column
    public name!: string;

    @BelongsToMany(() => User, () => UserRole)
    public users!: User[];

    @BelongsToMany(() => Access, () => RoleAccess)
    public accesses!: Access[];

}
