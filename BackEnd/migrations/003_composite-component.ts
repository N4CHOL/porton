import { DataType } from "sequelize-typescript";
import { Migration } from "../src/app";

export const up: Migration = async({context: sequelize})=>{
    return sequelize.addColumn('Composites', 'compositePComponentFK', DataType.BIGINT,)
    .then(() => {
        sequelize.addConstraint('Composites', {
            name: 'composite_pComponent_FK',
            type: 'foreign key',
            fields: ['compositePComponentFK'],
            references: {
                table: 'PhysicalComponents',
                field: 'physicalComponentId'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        })
    })
}

export const down: Migration = async ({context: sequelize})=>{
    return Promise.all([
        sequelize.removeConstraint('Composites', 'composite_pComponent_FK')
    ]).then(() => {
        sequelize.removeColumn('Composites', 'compositePComponentFK')
    })
}