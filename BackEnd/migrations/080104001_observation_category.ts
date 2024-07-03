import { DataType } from "sequelize-typescript";
import { Migration } from "../src/app";

export const up: Migration = async({context: sequelize})=>{
    return await sequelize.createTable('CategoriesObservation', {
        category_id: {
            type: DataType.BIGINT,
            primaryKey: true,
            allowNull: false
        },
        obs_id: {
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
        sequelize.addConstraint('CategoriesObservation', {
            type: 'foreign key',
            fields: ['category_id'],
            references: {
                table: 'Categories',
                field: 'categoryId'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        });
        sequelize.addConstraint('CategoriesObservation', {
            type: 'foreign key',
            fields: ['obs_id'],
            references: {
                table: 'Observations',
                field: 'observationId'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        })
    })
}

export const down: Migration = async ({context: sequelize})=>{
    return Promise.all([
        sequelize.removeConstraint('CategoriesObservation', 'category_id'),
        sequelize.removeConstraint('CategoriesObservation', 'obs_id')
    ]).then(() => {
        sequelize.dropTable('CategoriesObservation')
    })
}