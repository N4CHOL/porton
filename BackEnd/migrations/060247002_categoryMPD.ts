import { DataType } from "sequelize-typescript";
import { Migration } from "../src/app";

export const up: Migration = async({context: sequelize})=>{
    return await sequelize.createTable('CategoriesMPDs', {
        category_id: {
            type: DataType.BIGINT,
            primaryKey: true,
            allowNull: false
        },
        MPD_id: {
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
        sequelize.addConstraint('CategoriesMPDs', {
            type: 'foreign key',
            fields: ['category_id'],
            references: {
                table: 'Categories',
                field: 'categoryId'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        });
        sequelize.addConstraint('CategoriesMPDs', {
            type: 'foreign key',
            fields: ['MPD_id'],
            references: {
                table: 'MaintenancePlanDetails',
                field: 'maintenancePlanDetailId'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        })
    })
}

export const down: Migration = async ({context: sequelize})=>{
    return Promise.all([
        sequelize.removeConstraint('CategoriesMPDs', 'category_id'),
        sequelize.removeConstraint('CategoriesMPDs', 'MPD_id')
    ]).then(() => {
        sequelize.dropTable('CategoriesMPDs')
    })
}