import { DataType } from 'sequelize-typescript';
import { Migration } from '../src/app';
require('ts-node/register');
export const up: Migration = async ({ context: sequelize }) => {

    await sequelize.createTable('ProductionLineAssets', {
        productionLine_id: {
            type: DataType.BIGINT,
            primaryKey: true,
            allowNull: false
        },
        asset_id: {
            type: DataType.BIGINT,
            primaryKey: true,
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
    }).then(() => {
        sequelize.addConstraint('ProductionLineAssets', {
            type: 'foreign key',
            fields: ['productionLine_id'],
            references: {
                table: 'ProductionLines',
                field: 'productionLineId',
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
        sequelize.addConstraint('ProductionLineAssets', {
            type: 'foreign key',
            fields: ['asset_id'],
            references: {
                table: 'Assets',
                field: 'assetId',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        });
    })

    return Promise.all([])

}

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.removeConstraint('ProductionLineAssets', 'productionLine_id');
    await sequelize.removeConstraint('ProductionLineAssets', 'asset_Id');
    await sequelize.dropTable('ProductionLineAssets');

    return Promise.all([]);
}