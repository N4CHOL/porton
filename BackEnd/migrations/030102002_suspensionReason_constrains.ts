import { DataType } from 'sequelize-typescript';
import { Migration } from '../src/app';
export const up: Migration = async ({ context: sequelize }) => {

    //AÑADIR COLUMNA activitySuspensionReasonFk a Activities
    //AÑADIR CONSTRAINT DE FK a Activities
return sequelize.addColumn('Activities','activitySuspensionReasonFk',DataType.BIGINT).then(() => {
    sequelize.addConstraint('Activities', {
            name: 'activities_suspension_reason_fk',
            type: 'foreign key',
            fields: ['activitySuspensionReasonFk'],
            references: {
                table: 'SuspensionReasons',
                field: 'suspensionReasonId'
            },
            onDelete: 'set null',
            onUpdate: 'cascade'
        });
    })
}

export const down: Migration = async ({ context: sequelize }) => {
    return sequelize.removeConstraint('Activities','activities_suspension_reason_fk').then(()=> {
        sequelize.removeColumn('Activities','activitySuspensionReasonFk')
    })
}