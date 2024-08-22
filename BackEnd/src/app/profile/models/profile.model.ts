import { BelongsTo, Model, Table, Column, HasMany, Index, PrimaryKey, AutoIncrement, AllowNull, DataType, DefaultScope, Scopes } from "sequelize-typescript";
import { Activity } from "../../activities/models/activity.model";
import { Observation } from "../../assets/models/observation.model";
import { TemplateMPD } from "../../template-maintenance-plan/models/template-maitenance-plan.model";
import { IUser, User } from "../../user/models/user.model";
import { Email, IEmail } from "./email.model";

export interface IProfile {
    profileId?: number;
    firstName?: string | null; // Change the type to allow null values
    lastName?: string | null;
    emails?: IEmail[];
    user?: IUser;
}

@DefaultScope(() => ({ include: [Email, User] }))
@Scopes(() => ({
    noUser:
        {attributes: [
            'profileId',
            'firstName',
            'lastName'
        ]}
}))
@Table
export class Profile extends Model implements IProfile {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    public profileId!: number;

    @AllowNull(true) // Allow null values for firstName
    @Column(DataType.STRING) // Specify the data type as DataType.STRING 
    public firstName!: string | null; // Change the type to allow null values

    @AllowNull(true)
    @Column({
        type: DataType.STRING,
        allowNull: true, // Allow null values for lastName
    })
    public lastName!: string | null;

    @HasMany(() => Email, 'profileEmailFk')
    public emails!: Email[];

    @HasMany(() => Activity, 'activityAsigneeFk')
    public activities!: Activity[];

    @BelongsTo(() => User, 'userProfileFk')
    public user!: User;

    @HasMany(() => TemplateMPD, 'templateMPDAsigneeFK')
    public templateMPD!: TemplateMPD[];

    @HasMany(() => Observation, 'observationResponsibleFK')
    public observations!: Observation[];

}
