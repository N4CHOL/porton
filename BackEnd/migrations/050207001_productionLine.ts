import { DataType } from 'sequelize-typescript';
import { Migration } from '../src/app';
require('ts-node/register');
export const up: Migration = async ({ context: sequelize }) => {

    await sequelize.createTable('ProductionLines', {
        productionLineId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false
        },
        description: {
            type: DataType.STRING,
            allowNull: true
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

    return Promise.all([])

}

export const down: Migration = ({ context: sequelize }) => {
    return sequelize.dropTable('ProductionLines');
}