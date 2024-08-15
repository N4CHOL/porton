import { DataType } from "sequelize-typescript";
import { Migration } from "../src/app";

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.createTable('OperatorNotifications', {
        operatorNotificationsId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataType.STRING, // Adjust the data type if needed
            allowNull: true
        },
        name: {
            type: DataType.STRING, // Define the data type for 'name'
            allowNull: true // Modify this constraint as needed
        },
        compositeFK: DataType.BIGINT, // Adjust the foreign key data type
        assetFK: DataType.BIGINT, // Adjust the foreign key data type
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        }
    }).then(() => {
        sequelize.addConstraint('OperatorNotifications', {
            type: 'foreign key',
            fields: ['compositeFK'],
            references: {
                table: 'Composites', // Update with the correct table name
                field: 'compositeId', // Update with the correct field name
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
        sequelize.addConstraint('OperatorNotifications', {
            type: 'foreign key',
            fields: ['assetFK'],
            references: {
                table: 'Assets', // Update with the correct table name
                field: 'assetId', // Update with the correct field name
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
    });
}

export const down: Migration = ({ context: sequelize }) => {
    return sequelize.dropAllTables();

}
