import { DataType } from "sequelize-typescript";
import { Migration } from "../src/app";

export const up: Migration = async({context: sequelize})=>{
    return sequelize.addConstraint('Users', {
        name: 'unique_email_user',
        fields: ['email'],
        type: 'unique'
    })
}

export const down: Migration = async ({context: sequelize})=>{
    return sequelize.removeConstraint('Users', 'unique_email_user');
}