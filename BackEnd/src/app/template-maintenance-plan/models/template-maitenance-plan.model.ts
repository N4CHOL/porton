import { AutoIncrement, BelongsTo, Column, DataType, HasMany, HasOne, Model, PrimaryKey, Scopes, Table } from 'sequelize-typescript';
import { ActivityTemplate } from '../../activitiesTemplates/models/activityTemplate.model';
import { Asset, IAsset } from '../../assets/models/asset.model';
import { IProfile, Profile } from '../../profile/models/profile.model';
import { IPriority, Priority } from '../../shared/classes/priority.model';
import { IRecurrence, Recurrence } from './recurrence.model';
import { ITemplateActivTempl, TemplateActivTempl } from './template-activity-template.model';
import { DaysOfWeek, IDaysOfWeek } from '../../shared/classes/daysOfWeek.model';

export interface ITemplateMPD {

    templateMPDId?: number;
    name: string;
    description: string;
    templActivitiesT: ITemplateActivTempl[];
    asset: IAsset;
    asignee: IProfile;
    priority: IPriority;
    recurrence?: IRecurrence;
    daysOfWeek?: IDaysOfWeek | null;
}

@Scopes(() => ({
    lean: {
        attributes: ['name', 'templateMPDId']
    }
}))
@Table({tableName: 'TemplateMPD'})
export class TemplateMPD extends Model implements ITemplateMPD {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    public templateMPDId!: number;

    @Column
    public name!: string;
    
    @Column
    public description!: string;

    @HasMany(() => TemplateActivTempl, 'templMPDTActivTmplFK')
    public templActivitiesT!: TemplateActivTempl[];

    @BelongsTo(() => Asset, {
        foreignKey: 'templMPDTAssetFK',
        onDelete: 'SET NULL',
        constraints: false,
    })
    public asset!: Asset;

    @BelongsTo(() => Profile, {
        foreignKey: 'templateMPDAsigneeFK',
        onDelete: 'SET NULL'
    })
    public asignee!: Profile;

    @BelongsTo(() => Priority, {
        foreignKey: 'templateMPDPriorityFK',
        onDelete: 'SET NULL'
    })
    public priority!: Priority;

    @BelongsTo(() => DaysOfWeek, {
        foreignKey: {
            name: 'templateMPDDaysOfWeekFK',
            allowNull: true, // Permite valores nulos
        },
        onDelete: 'SET NULL'
    })
    public daysOfWeek!: DaysOfWeek | null;
    
    
    
    @HasOne(()=> Recurrence,'recurrenceTMPDFK')
    public recurrence!: Recurrence;
}

