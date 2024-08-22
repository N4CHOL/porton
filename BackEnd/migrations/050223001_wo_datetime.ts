import { DataType } from 'sequelize-typescript';
import { Migration } from '../src/app';

export const up: Migration = async ({ context: sequelize }) => {
  return sequelize.addColumn(
    'MaintenancePlanDetails',
    'dateHourSchedueledEnd',
    {
      type: DataType.DATE,
    }
  );
};

export const down: Migration = async ({ context: sequelize }) => {
  return sequelize.removeColumn('MaintenancePlanDetails', 'dateHourSchedueled');
};
