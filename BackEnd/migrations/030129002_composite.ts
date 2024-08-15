import sequelize from "sequelize";
import { DataType } from 'sequelize-typescript';
import { Migration } from '../src/app';

export const up: Migration = async ({context: sequelize}) => {

    return sequelize.addColumn('Composites','parentAssetTag', DataType.STRING)
}

export const down: Migration = async ({context: sequelize}) => {
    return sequelize.removeColumn('Composites', 'parentAssetTag');
} 