import { DataType } from "sequelize-typescript";
import { Migration } from "../src/app";

export const up: Migration = async ({ context: sequelize }) => {
    return await sequelize.createTable('PhysicalComponents', {
            physicalComponentId: {
                type: DataType.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            name: DataType.STRING,
            createdAt: {
                type: DataType.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataType.DATE,
                allowNull: false
            },
            pComponentMTypeFK: DataType.BIGINT,
            description: DataType.STRING,
            pComponentSpareCFK: DataType.BIGINT
    
        }).then(() => {
            sequelize.addConstraint('PhysicalComponents', {
                name: 'physicalComponent_machineTypes_FK',
                type: 'foreign key',
                fields: ['pComponentMTypeFK'],
                references: {
                    table: 'MachineTypes',
                    field: 'machineTypeId',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
            sequelize.addConstraint('PhysicalComponents', {
                name: 'physicalComponent_spareComponents_FK',
                type: 'foreign key',
                fields: ['pComponentSpareCFK'],
                references: {
                    table: 'SpareComponents',
                    field: 'spareComponentId'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
        });
    
}

export const down: Migration = async ({ context: sequelize }) => {
    return Promise.all([
        sequelize.removeConstraint('PhysicalComponents', 'physicalComponent_machineTypes_FK'),
        sequelize.removeConstraint('PhysicalComponents', 'physicalComponent_spareComponents_FK')
    ]).then(() => {
        sequelize.dropTable('PhysicalComponents')
        
    });
}