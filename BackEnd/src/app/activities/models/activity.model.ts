import { AutoIncrement, BelongsTo, Column, DataType, DefaultScope, HasMany, Model, PrimaryKey, Scopes, Table } from "sequelize-typescript";

import { Composite, IComposite } from "../../assets/models/composite.model";
import { IMaintenancePlanDetail, MaintenancePlanDetail } from "../../maintenance-plan/models/maintenance-plan-detail.model";
import { IProfile, Profile } from "../../profile/models/profile.model";
import { ActState } from "./actstate.model";
import { SuspensionReason } from "./suspensionReason.model";
import { IAsset, Asset } from "../../assets/models/asset.model";
import { ITask, Task } from "./task.model";
import { ITemplateMPD, TemplateMPD } from "../../template-maintenance-plan/models/template-maitenance-plan.model";
import { ActivityTemplate, IActivityTemplate } from "../../activitiesTemplates/models/activityTemplate.model";



export interface IActivity {
    name?: string;
    activityId?: number;
    state: ActState;
    asset: IAsset;
    template: IActivityTemplate;
    component?: IComposite;
    dateHourStart?: Date;
    dateHourEnd?: Date;
    tasks: ITask[];
    maintenancePlanDetail?: IMaintenancePlanDetail;
    asignee: IProfile;
    suspensionReason: SuspensionReason;
    description?: string;
    templateMPD?: ITemplateMPD
}

@DefaultScope(() => ({ include: [Task, ActState, Composite] }))
@Scopes(() => ({
    onlyActivityTemplate:
        { include: [ActivityTemplate] },
    onlyActStates:
    {
        include: [
            ActivityTemplate.scope('noRelations'),
            ActState
        ]
    },
    onlyTasks:
    {
        include: [
            Task,
        ]
    },
    onlyMPD:
    {
        include: [
            MaintenancePlanDetail,
        ]
    },
    onlySuspensionReason:
    {
        include: [
            SuspensionReason,
            ActState,
        ]
    },
})
)
@Table
export class Activity extends Model implements IActivity {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    activityId!: number;

    @Column
    public description!: string;

    @Column
    public name!: string;

    @Column
    dateHourStart!: Date;

    @Column
    dateHourEnd?: Date;

    @BelongsTo(() => ActState, 'activityStateFk')
    state!: ActState;

    @BelongsTo(() => ActivityTemplate, 'activityTemplateFk')
    template!: ActivityTemplate;

    @BelongsTo(() => Composite, {
        foreignKey: 'activityCompositeFK',
        constraints: false,
    })
    public component!: Composite;

    @BelongsTo(() => Asset, {
        foreignKey: 'assetMPDetailFk',
        constraints: false,
    })
    public asset!: Asset;


    @HasMany(() => Task, 'activityTaskFk')
    tasks!: Task[];

    @BelongsTo(() => MaintenancePlanDetail, 'activityMPDFk')
    maintenancePlanDetail!: MaintenancePlanDetail;

    @BelongsTo(() => TemplateMPD, 'activityTMPD')
    templateMPD!: TemplateMPD;

    @BelongsTo(() => Profile, 'activityAsigneeFk')
    public asignee!: Profile;

    @BelongsTo(() => SuspensionReason, 'activitySuspensionReasonFk')
    suspensionReason!: SuspensionReason;
}