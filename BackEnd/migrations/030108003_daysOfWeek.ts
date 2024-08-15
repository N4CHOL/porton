import { DataType } from 'sequelize-typescript';
import { Migration } from '../src/app';
require('ts-node/register');
export const up: Migration = async ({ context: sequelize }) => {

    await sequelize.createTable('DaysOfWeek', {
        daysOfWeekId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false
        },

        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        }
    })
    await sequelize.createTable('MaintenancePlanDetailDaysOfWeek', {
        MaintenancePlanDetailDaysOfWeekId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        },

        maintenancePlanDetailFk: DataType.BIGINT,
        daysOfWeekFk: DataType.BIGINT
    }).then(() => {
        sequelize.addConstraint('MaintenancePlanDetailDaysOfWeek', {
            type: 'foreign key',
            fields: ['maintenancePlanDetailFk'],
            references: {
                table: 'MaintenancePlanDetails',
                field: 'maintenancePlanDetailId',
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
        sequelize.addConstraint('MaintenancePlanDetailDaysOfWeek', {
            type: 'foreign key',
            fields: ['daysOfWeekFk'],
            references: {
                table: 'DaysOfWeek',
                field: 'daysOfWeekId',
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
    });


    return Promise.all([])

}

export const down: Migration = ({ context: sequelize }) => {
    return sequelize.dropAllTables();

}