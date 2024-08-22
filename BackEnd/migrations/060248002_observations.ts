import { DataType } from "sequelize-typescript";
import { Migration } from "../src/app";

export const up: Migration = async({ context:sequelize })=>{
    await sequelize.createTable('Observations', {
        observationId: {
            type:DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataType.STRING(3000),
            allowNull: false
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        },
        observationAssetFK: DataType.BIGINT,
        observationSpareComponentFK: DataType.BIGINT,
        observationResponsibleFK: DataType.BIGINT
    })

    return Promise.all([])
}

export const down: Migration = ({ context: sequelize }) => {
    return sequelize.dropTable('Observations');
}