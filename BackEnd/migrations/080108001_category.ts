import { DataType } from "sequelize-typescript";
import { Migration } from "../src/app";

export const up: Migration = async({context: sequelize})=>{
    
    return sequelize.changeColumn('Categories', 'description', {
        type: DataType.STRING(3000),
        allowNull: true
    }) 
}

export const down: Migration = async ({context: sequelize})=>{
    return sequelize.changeColumn('Categories', 'description', {
        type: DataType.STRING
    })
}