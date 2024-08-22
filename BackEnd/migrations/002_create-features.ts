import { DataType } from "sequelize-typescript";
import { Migration } from "../src/app";

export const up: Migration = async ({ context: sequelize }) => {
    return sequelize.createTable('Features', {
        featureId: {
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

export const down: Migration = async ({ context: sequelize }) => {
    return sequelize.dropTable('Features');
}