import sequelize from 'sequelize';
import { DataType } from 'sequelize-typescript';
import { Migration } from '../src/app';

export const up: Migration = async ({ context: sequelize }) => {
    return await sequelize.createTable('TemplateActivTempl', {
        templateActivTemplId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        templATActivTmplFK: DataType.BIGINT,
        templATCompositeFK: DataType.BIGINT,
        templMPDTActivTmplFK: DataType.BIGINT,
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        }
    }).then(() => {
        sequelize.addConstraint('TemplateActivTempl', {
            name: 'templateAT_activTmpl_FK',
            type: 'foreign key',
            fields: ['templATActivTmplFK'],
            references: {
                table: 'ActivityTemplates',
                field: 'activityTemplateId'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        });
        sequelize.addConstraint('TemplateActivTempl', {
            name: 'composite_activTmpl_FK',
            type: 'foreign key',
            fields: ['templATCompositeFK'],
            references: {
                table: 'Composites',
                field: 'compositeId'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        });
        sequelize.addConstraint('TemplateActivTempl', {
            name: 'templMPD_activTmpl_FK',
            type: 'foreign key',
            fields: ['templMPDTActivTmplFK'],
            references: {
                table: 'TemplateMPD',
                field: 'templateMPDId'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        });
    });

}

export const down: Migration = async ({ context: sequelize }) => {
    return Promise.all([
        sequelize.removeConstraint('TemplateActivTempl', 'templateAT_activTmpl_FK'),
        sequelize.removeConstraint('TemplateActivTempl', 'composite_activTmpl_FK'),
        sequelize.removeConstraint('TemplateActivTempl', 'templMPD_activTmpl_FK')
    ]).then(() => {
        sequelize.dropTable('templateMPD_priority_FK')
        sequelize.dropTable('templateMPD_daysOfWeek_FK')
    });
}