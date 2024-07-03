import { DataType } from "sequelize-typescript";
import { Migration } from "../src/app";

export const up: Migration = async ({ context: sequelize }) => {
    return await sequelize.createTable('TemplateMPD', {
      templateMPDId: {
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
      },
      description: {
        type: DataType.STRING,
        allowNull: true,
      },
      templMPDTAssetFK: DataType.BIGINT,
      templateMPDAsigneeFK: DataType.BIGINT,
      templateMPDPriorityFK: DataType.BIGINT,
      templateMPDDaysOfWeekFK: DataType.BIGINT, // Add this column
      createdAt: {
        type: DataType.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataType.DATE,
        allowNull: false,
      },
    }).then(() => {
      sequelize.addConstraint('TemplateMPD', {
        name: 'templateMPD_Assets_FK',
        type: 'foreign key',
        fields: ['templMPDTAssetFK'],
        references: {
          table: 'Assets',
          field: 'assetId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
      sequelize.addConstraint('TemplateMPD', {
        name: 'templateMPD_asignee_FK',
        type: 'foreign key',
        fields: ['templateMPDAsigneeFK'],
        references: {
          table: 'Profiles',
          field: 'profileId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
      sequelize.addConstraint('TemplateMPD', {
        name: 'templateMPD_priority_FK',
        type: 'foreign key',
        fields: ['templateMPDPriorityFK'],
        references: {
          table: 'Priorities',
          field: 'priorityId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });

      sequelize.addConstraint('Activities', {
        type: 'foreign key',
        fields: ['activityTMPD'],
        references: {
            table: 'TemplateMPD',
            field: 'templateMPDId'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    });


      sequelize.addConstraint('TemplateMPD', {
        name: 'templateMPD_daysOfWeek_FK',
        type: 'foreign key',
        fields: ['templateMPDDaysOfWeekFK'],
        references: {
          table: 'DaysOfWeek',
          field: 'daysOfWeekId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    });
  };
  

export const down: Migration = async ({ context: sequelize }) => {
    return Promise.all([
        sequelize.removeConstraint('TemplateMPD', 'templateMPD_templateActT_FK'),
        sequelize.removeConstraint('TemplateMPD', 'templateMPD_asignee_FK'),
        sequelize.removeConstraint('TemplateMPD', 'templateMPD_priority_FK'),
        sequelize.removeConstraint('TemplateMPD', 'templateMPD_daysOfWeek_FK')
    ]).then(() => {
        sequelize.dropTable('templateMPD_priority_FK')
        sequelize.dropTable('templateMPD_daysOfWeek_FK')
    });
}