import sequelize from 'sequelize';
import { DataType } from 'sequelize-typescript';
import { Migration } from "../src/app";


export const up: Migration = async({context: sequelize}) => {
    return sequelize.addColumn('Activities','activityCompositeFK', DataType.BIGINT)
    .then(() => {
        sequelize.addConstraint('Activities', {
            name: 'activity_composite_FK',
            type: 'foreign key',
            fields: ['activityCompositeFK'],
            references: {
                table: 'Composites',
                field: 'compositeId'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        })
    })
}

export const down: Migration = async ({context: sequelize}) => {
    return Promise.all([
        sequelize.removeConstraint('Activities', 'activity_composite_FK')
    ]).then(() => {
        sequelize.removeColumn('Activities', 'activityCompositeFK')
    })
}