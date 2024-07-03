import { DataType } from "sequelize-typescript";
import { Migration } from "../src/app";


export const up: Migration = async ({ context: sequelize }) => {
    return await sequelize.createTable('Attributes', {
        attributeId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false
        },
        value: {
            type: DataType.STRING,
            allowNull: false
        },
        description: DataType.STRING,
        pComponentAttributeFK: {
            type: DataType.BIGINT,
            // allowNull: false
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
        sequelize.addConstraint('Attributes', {
            name: 'attribute_pComponent_FK',
            type: 'foreign key',
            fields: ['pComponentAttributeFK'],
            references: {
                table: 'PhysicalComponents',
                field: 'physicalComponentId'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        })
    })
}

export const down: Migration = async ({ context: sequelize }) => {
    return Promise.all([
        sequelize.removeConstraint('Attributes', 'attribute_pComponent_FK')
    ]).then(() => {
        sequelize.dropTable('Attributes')
    })
}