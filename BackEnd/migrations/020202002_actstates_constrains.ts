import { DataType } from 'sequelize-typescript';
import { Migration } from '../src/app';
export const up: Migration = async ({ context: sequelize }) => {

    //AÑADIR COLUMNA activityStateFk a Activities
    //AÑADIR CONSTRAINT DE FK a Activities
return sequelize.addColumn('Activities','activityStateFk',DataType.BIGINT).then(() => {
    sequelize.addConstraint('Activities', {
            name: 'activities_state_Fk',
            type: 'foreign key',
            fields: ['activityStateFk'],
            references: {
                table: 'ActStates',
                field: 'actstateId'
            },
            onDelete: 'set null',
            onUpdate: 'cascade'
        });
    })
}

export const down: Migration = async ({ context: sequelize }) => {
    return sequelize.removeConstraint('Activities','activities_state_Fk').then(()=> {
        sequelize.removeColumn('Activities','activityStateFk')
    })
}