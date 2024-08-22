import { DataType } from "sequelize-typescript";
import { Migration } from "../src/app";

export const up: Migration = async({context: sequelize})=>{
    return sequelize.changeColumn('PhysicalComponents','description',{
        type: DataType.TEXT
    })
}

export const down: Migration = async ({context: sequelize})=>{
    return sequelize.changeColumn('PhysicalComponents','description',{
        type: DataType.STRING
    })
}