import sequelize from 'sequelize';
import { DataType } from 'sequelize-typescript';
import { Migration } from '../src/app';
export const up: Migration = async ({ context: sequelize }) => {

    return sequelize.addColumn('Observations', 'worStateFk', DataType.BIGINT).then(() =>  {
        sequelize.addConstraint('Observations', {
            name: 'wor_state_fk',
            type: 'foreign key',
            fields: ['worStateFk'],
            references: {
                table: 'WorStates',
                field: 'worstateId'
            },
            onDelete: 'set null',
            onUpdate: 'cascade'
            });
        })
}

export const down: Migration = async ({ context: sequelize}) => {
    return sequelize.removeConstraint('Observations', 'wor_state_fk').then(() => {
        sequelize.removeColumn('Observations', 'worStateFk')
    })
}