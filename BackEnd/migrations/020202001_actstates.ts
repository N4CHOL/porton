
import { DataType } from 'sequelize-typescript';
import { Migration } from '../src/app';
require('ts-node/register');
export const up: Migration = async ({ context: sequelize }) => {

    await sequelize.createTable('ActStates', {
        actstateId: {
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

    return Promise.all([])

}

export const down: Migration = ({ context: sequelize }) => {
    return sequelize.dropTable('ActStates');
}