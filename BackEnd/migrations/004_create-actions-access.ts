import { DataType } from "sequelize-typescript";
import { Migration } from "../src/app";

export const up: Migration = async ({ context: sequelize }) => {
    return sequelize.createTable('ActionsAccesses', {
        actionAccessesId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        actionFk: DataType.BIGINT,
        accessFk: DataType.BIGINT,
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        }
    }).then(() => {
        sequelize.addConstraint('ActionsAccesses', {
            name: 'actionsAccesses_actions_foreignKey',
            type: 'foreign key',
            fields: ['actionFk'],
            references: {
                table: 'Actions',
                field: 'actionId',
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
        sequelize.addConstraint('ActionsAccesses', {
            name: 'actionsAccesses_accesses_foreignKey',
            type: 'foreign key',
            fields: ['accessFk'],
            references: {
                table: 'Accesses',
                field: 'accessId',
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
    });
}

export const down: Migration = async ({ context: sequelize }) => {
    return Promise.all([
        sequelize.removeConstraint('ActionsAccesses', 'actionsAccesses_accesses_foreignKey'),
        sequelize.removeConstraint('ActionsAccesses', 'actionsAccesses_actions_foreignKey'),
        sequelize.dropTable('ActionsAccesses')
    ])
}