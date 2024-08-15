import {
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

import { IMaintenancePlanDetail, MaintenancePlanDetail } from '../../maintenance-plan/models/maintenance-plan-detail.model';
import { DaysOfWeek, IDaysOfWeek } from './daysOfWeek.model';

export interface IMaintenancePlanDetailDaysOfWeek {
    maintenancePlanDetailDaysOfWeekId?: number;
    maintenancePlanDetail?: IMaintenancePlanDetail,
    daysOfWeek?: IDaysOfWeek


}

@Table({ tableName: 'MaintenancePlanDetailDaysOfWeek' })
export class MaintenancePlanDetailDaysOfWeek extends Model implements IMaintenancePlanDetailDaysOfWeek {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    public MaintenancePlanDetailDaysOfWeekId!: number;

    @BelongsTo(() => MaintenancePlanDetail, {
        foreignKey: 'maintenancePlanDetailFk',
        targetKey: 'maintenancePlanDetailId', 
      })
      maintenancePlanDetail!: MaintenancePlanDetail;
      
      @BelongsTo(() => DaysOfWeek, {
        foreignKey: 'daysOfWeekFk',
        targetKey: 'daysOfWeekId', 
      })
      daysOfWeek!: DaysOfWeek;

}
