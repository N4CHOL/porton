import { DataType } from 'sequelize-typescript';
import { Migration } from '../src/app';
export const up: Migration = async ({ context: sequelize }) => {

    //AÑADIR COLUMNA woPriorityFk a MaintenancePlanDetail
    //AÑADIR CONSTRAINT DE FK a MaintenancePlanDetail
return sequelize.addColumn('MaintenancePlanDetails','woPriorityFk',DataType.BIGINT).then(() => {
    sequelize.addConstraint('MaintenancePlanDetails', {
            name: 'wo_priority_Fk',
            type: 'foreign key',
            fields: ['woPriorityFk'],
            references: {
                table: 'Priorities',
                field: 'priorityId'
            },
            onDelete: 'set null',
            onUpdate: 'cascade'
        });
    })
}

export const down: Migration = async ({ context: sequelize }) => {
    return sequelize.removeConstraint('MaintenancePlanDetails','wo_priority_Fk').then(()=> {
        sequelize.removeColumn('MaintenancePlanDetails','woPriorityFk')
    })
}