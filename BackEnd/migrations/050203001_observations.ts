import { DataType } from "sequelize-typescript";
import { Migration } from "../src/app";

export const up: Migration = async({context: sequelize})=>{
    return sequelize.addColumn('Activities','observation',DataType.STRING)
}

export const down: Migration = async ({context: sequelize})=>{
    return sequelize.removeColumn('Activities','observation');
}
