import { BelongsTo, AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import { IProfile, Profile } from "./profile.model";

export interface IEmail {
    emailId?: number;
    email: string;
    profile?: IProfile;
}

@Table
export class Email extends Model implements IEmail {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    public emailId!: number;

    @AllowNull(false)
    @Column
    public email!: string;

    @BelongsTo(() => Profile, 'profileEmailFk')
    public profile!: Profile;
}