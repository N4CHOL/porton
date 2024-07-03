import {
  Table,
  Model,
  AutoIncrement,
  PrimaryKey,
  Column,
  HasMany,
  AllowNull,
  DataType,
  DefaultScope,
  Scopes,
  BelongsTo,
} from 'sequelize-typescript';
import { Activity } from '../../activities/models/activity.model';
import { TemplateActivTempl } from '../../template-maintenance-plan/models/template-activity-template.model';
import { TemplateMPD } from '../../template-maintenance-plan/models/template-maitenance-plan.model';
import { ITaskTemplate, TaskTemplate } from './taskTemplate.model';
import { Asset, IAsset } from '../../assets/models/asset.model';
import { Composite, IComposite } from '../../assets/models/composite.model';

export interface IActivityTemplate {
  activityTemplateId?: number;
  name: string;
  description: string;
  asset: IAsset| null;
  composite: IComposite |null;
  tasks: ITaskTemplate[];
}

@DefaultScope(() => ({ include: [TaskTemplate] }))
@Scopes(() => ({
  onlyActivities: { include: [Activity] },
  noRelations: { attributes: ['activityTemplateId', 'name'] }
}))
@Table
export class ActivityTemplate extends Model implements IActivityTemplate {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.BIGINT)
  public activityTemplateId!: number;

  @AllowNull(false)
  @Column
  public name!: string;

  @AllowNull(true)
  @Column
  public description!: string;

  @BelongsTo(() => Composite, {
    foreignKey: 'compositeId',
  })
  public composite!: Composite | null;

  @BelongsTo(() => Asset , {
    foreignKey: 'assetId'
  })
  public asset!: Asset | null;

  @HasMany(() => TaskTemplate, 'activityTemplateFK')
  public tasks!: TaskTemplate[];

  @HasMany(() => Activity, 'activityTemplateFk')
  activities!: Activity[];

  @HasMany(() => TemplateActivTempl, 'templATActivTmplFK')
  public templActTmpl!: TemplateActivTempl[];
}
