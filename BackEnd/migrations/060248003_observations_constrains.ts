import { Migration } from "../src/app"

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.addConstraint('Observations', {
        name: 'observation_spare_FK',
        type: 'foreign key',
        fields: ['observationSpareComponentFK'],
        references: {
            table: 'SpareComponents',
            field: 'spareComponentId'
        },
        onDelete: 'set null',
        onUpdate: 'cascade'
    }),
    sequelize.addConstraint('Observations', {
        name: 'observation_asset_FK',
        type: 'foreign key',
        fields: ['observationAssetFK'],
        references: {
            table: 'Assets',
            field: 'assetId'
        },
        onDelete: 'set null',
        onUpdate: 'cascade'
    }),
    sequelize.addConstraint('Observations', {
        name: 'observation_responsible_FK',
        type: 'foreign key',
        fields: ['observationResponsibleFK'],
        references: {
            table: 'Profiles',
            field: 'profileId'
        },
        onDelete: 'set null',
        onUpdate: 'cascade'
    })
    return Promise.all([]);
}

export const down: Migration = async ({ context: sequelize }) => {
    return Promise.all([
        sequelize.removeConstraint('Observations', 'observation_spare_FK'),
        sequelize.removeConstraint('Observations', 'observation_asset_FK'),
        sequelize.removeConstraint('Observations', 'observation_responsible_FK')
    ])
}