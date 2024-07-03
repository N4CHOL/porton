import { Sequelize } from "sequelize";
import { AutoIncrement, BeforeCreate, BelongsTo, BelongsToMany, Column, DataType, DefaultScope, HasMany, HasOne, Model, PrimaryKey, Scopes, Table } from "sequelize-typescript";
import { IActivity, Activity } from "../../activities/models/activity.model";
import { ActState } from "../../activities/models/actstate.model";
import { IAsset, Asset } from "../../assets/models/asset.model";
import { IProfile, Profile } from "../../profile/models/profile.model";
import { IPriority, Priority } from "../../shared/classes/priority.model";
import { Category } from "../../shared/models/category.model";
import categoryMPD from "./categoryMPD.model";
import { IWOState, WOState } from "./wostate.model";
import { DaysOfWeek, IDaysOfWeek } from "../../shared/classes/daysOfWeek.model";
import { MaintenancePlanDetailDaysOfWeek } from "../../shared/classes/MaintenancePlanDetailDaysOfWeek.model";

export interface IMaintenancePlanDetail {

    maintenancePlanDetailId?: number;
    name: string;
    description: string;
    activities: IActivity[];
    dateHourGenerated?: Date;
    dateHourSchedueled: Date;
    dateHourSchedueledEnd?: Date;
    dateHourStarted?: Date;
    dateHourCompleted?: Date;
    state?: IWOState;
    asset: IAsset | null;
    asignee: IProfile;
    priority?: IPriority;
    categories?: Category[];
    daysOfWeek?: IDaysOfWeek[];

}

@DefaultScope(() => ({ include: [Profile, WOState, Asset, { model: Activity, attributes: ['activityId'], include: [{ model: Profile }] }] }))

@Scopes(() => ({
    onlyActivities: {
        include: [
            Activity
        ]
    },
    activitiesAndAsignees: {
        include: [
            {
                model: Activity, include: [Profile,
                    {
                        model: ActState,
                        where: Sequelize.or(
                            { name: 'PENDIENTE REALIZACION' },
                            { name: 'EN PROCESO' },
                            { name: 'SUSPENDIDA' },
                            { name: 'LISTO' },
                        )
                    }
                ]
            },
            WOState
        ]
    },
    noActivities: {
        include: [Profile, WOState, Priority, Asset, DaysOfWeek]
    }
}))

@Table
export class MaintenancePlanDetail extends Model implements IMaintenancePlanDetail {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    public maintenancePlanDetailId!: number;

    @Column
    public name!: string;

    @Column
    public description!: string;

    @Column
    public dateHourGenerated!: Date;

    @Column
    public dateHourSchedueled!: Date;

    @Column
    public dateHourSchedueledEnd!: Date;

    @Column
    public dateHourStarted!: Date;

    @Column
    public dateHourCompleted!: Date;

    @BelongsTo(() => WOState, 'wostateFk')
    public state!: WOState;

    @BelongsTo(() => Asset, {
        foreignKey: 'assetMPDetailFk',
        constraints: false,
    })
    public asset!: Asset | null;


    @HasMany(() => Activity, 'activityMPDFk')
    public activities!: Activity[];

    @BelongsTo(() => Profile, 'maintenancePlanDetailFk')
    public asignee!: Profile;

    @BelongsTo(() => Priority, 'woPriorityFk')
    public priority!: Priority;


    @BelongsToMany(() => Category, () => categoryMPD)
    public categories!: Category[];

    @BelongsToMany(() => DaysOfWeek, () => MaintenancePlanDetailDaysOfWeek, 'maintenancePlanDetailFk', 'daysOfWeekFk')
    public daysOfWeek!: DaysOfWeek[];

    @BeforeCreate
    static registerDateHourGenerated(instance: MaintenancePlanDetail) {
        const dateHourGenerated: Date = new Date();
        instance.dateHourGenerated = dateHourGenerated;
    }

}