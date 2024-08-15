import { DataType } from "sequelize-typescript";
import { Migration } from "../src/app";

export const up: Migration = async({ context: sequelize })=>{
    return await sequelize.createTable('Recurrence', {
            recurrenceId: {
                type: DataType.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            dateHourStarted: {
                type: DataType.DATE,
                allowNull: false
            },
            amountOfDays: {
                type: DataType.INTEGER,
                allowNull: false
            },
            recurrenceTMPDFK: DataType.BIGINT,
            createdAt: {
                type: DataType.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataType.DATE,
                allowNull: false
            }
        }).then(() => {
            sequelize.addConstraint('Recurrence', {
                name: 'recurrence_TMPD_FK',
                type: 'foreign key',
                fields: ['recurrenceTMPDFK'],
                references: {
                    table: 'TemplateMPD',
                    field: 'templateMPDId'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            })
        });
}

export const down: Migration = async ({context: sequelize})=>{
    return sequelize.removeConstraint('Recurrence', 'recurrence_TMPD_FK' );
}