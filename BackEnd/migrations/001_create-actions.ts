import sequelize from "sequelize";
import { DataType } from "sequelize-typescript";
import { Migration } from "../src/app";

export const up: Migration = async({context: sequelize})=>{
    return sequelize.createTable('Actions', {
            actionId: {
                type: DataType.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            name:{
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
        });

}

export const down: Migration = async ({context: sequelize})=>{

    return sequelize.dropTable('Actions');
}