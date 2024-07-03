import sequelize from 'sequelize';
import { Sequelize } from 'sequelize';
import { INTEGER } from 'sequelize';
import { DataType } from 'sequelize-typescript';
import { Migration } from '../src/app';

export const up: Migration = async ({ context: sequelize }) => {

    return Promise.all([
        sequelize.changeColumn('Providers', 'phone', {
            type: DataType.STRING,
            allowNull: true
        }),

        sequelize.changeColumn('Providers', 'address', {
            type: DataType.STRING,
            allowNull: true
        })
    ]);
}

export const down: Migration = async ({ context: sequelize }) => {

    return Promise.all([
        sequelize.changeColumn('Providers', 'phone', {
            type: DataType.STRING,
            allowNull: false
        }),

        sequelize.changeColumn('Providers', 'address', {
            type: DataType.STRING,
            allowNull: false
        })
    ]);
}

