import { DataType } from "sequelize-typescript";
import { Migration } from "../src/app";

export const up: Migration = async ({ context: sequelize }) => {
    return Promise.all([
        sequelize.addColumn('Accesses', 'featureAccessFk', DataType.BIGINT),
        sequelize.removeColumn('Accesses', 'name')
    ]).then(() => {
        sequelize.addConstraint('Accesses', {
            name: 'accesses_features_foreignKey',
            type: 'foreign key',
            fields: ['featureAccessFk'],
            references: {
                table: 'Features',
                field: 'featureId',
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
    })
}

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.removeConstraint('Accesses', 'accesses_featurs_foreignKey');
    sequelize.removeColumn('Accesses', 'featureAccessFk');
}