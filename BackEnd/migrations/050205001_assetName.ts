import { DataType } from 'sequelize-typescript';
import { Migration } from '../src/app';

export const up: Migration = async ({context: sequelize}) => {
    return sequelize.addColumn('Assets','name', DataType.STRING)
}

export const down: Migration = async ({ context: sequelize }) => {
     return sequelize.removeColumn('Assets','name')
}
