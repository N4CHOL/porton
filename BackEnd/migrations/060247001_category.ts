import { DataType } from "sequelize-typescript";
import { Migration } from "../src/app";

export const up: Migration = async({context: sequelize})=>{
    return await sequelize.createTable('Categories', {
            categoryId: {
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
        });
        return Promise.all([]);
}

export const down: Migration = async ({context: sequelize})=>{
    return sequelize.dropTable('Categories');
}