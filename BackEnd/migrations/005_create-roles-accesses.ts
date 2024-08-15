import { DataType } from "sequelize-typescript";
import { Migration } from "../src/app";

export const up: Migration = async ({ context: sequelize }) => {
    return sequelize.createTable('RolesAccesses', {
        roleAccessId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        roleFk: DataType.BIGINT,
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
        sequelize.addConstraint('RolesAccesses', {
            name: 'roles_accesses_foreignKey',
            type: 'foreign key',
            fields: ['roleFk'],
            references: {
                table: 'Roles',
                field: 'roleId',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        });
        sequelize.addConstraint('RolesAccesses', {
            name: 'accesses_roles_foreignKey',
            type: 'foreign key',
            fields: ['accessFk'],
            references: {
                table: 'Accesses',
                field: 'accessId',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        });
    })
}

export const down: Migration = async ({ context: sequelize }) => {
    return Promise.all([
        sequelize.removeConstraint('RolesAccesses', 'accesses_roles_foreignKey'),
        sequelize.removeConstraint('RolesAccesses', 'roles_accesses_foreignKey')
    ]).then(() => {
        sequelize.dropTable('RolesAccesses');
    })
}