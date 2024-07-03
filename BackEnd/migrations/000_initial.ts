
import { DataType } from 'sequelize-typescript';
import { Migration } from '../src/app';
require('ts-node/register');
// First  Migration
export const up: Migration = async ({ context: sequelize }) => {

    await sequelize.createTable('Accesses', {
        accessId: {
            type: DataType.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        }
    })

    await sequelize.createTable('Businesses', {
        businessId: {
            type: DataType.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false
        },
        businessName: {
            type: DataType.STRING
        },
        cuit: {
            type: DataType.STRING,
            allowNull: false
        },
        direction: {
            type: DataType.STRING,
            allowNull: false
        },
        isEnabled: {
            type: DataType.BOOLEAN
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        }
    })

    await sequelize.createTable('TypeUnits', {
        typeUnitId: {
            type: DataType.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        }
    })

    await sequelize.createTable('Units', {
        unitId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false
        },
        number: {
            type: DataType.INTEGER
        },
        email: {
            type: DataType.STRING
        },
        phone: {
            type: DataType.STRING
        },
        direction: {
            type: DataType.STRING
        },
        isEnabled: {
            type: DataType.BOOLEAN
        },
        businessUnitFK: {
            type: DataType.BIGINT
        },
        unitsTypeUnitFK: {
            type: DataType.BIGINT
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
        sequelize.addConstraint('Units', {
            type: 'foreign key',
            fields: ['businessUnitFK'],
            references: {
                table: 'Businesses',
                field: 'businessId'
            },
            onDelete: 'set null',
            onUpdate: 'cascade'
        });
        sequelize.addConstraint('Units', {
            type: 'foreign key',
            fields: ['unitsTypeUnitFK'],
            references: {
                table: 'TypeUnits',
                field: 'typeUnitId'
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        })
    })

    await sequelize.createTable('Sectors', {
        sectorId: {
            type: DataType.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false
        },
        number: {
            type: DataType.INTEGER
        },
        internalNumber: {
            type: DataType.INTEGER
        },
        sectorUnitId: {
            type: DataType.BIGINT
        },
        sectorsId: {
            type: DataType.BIGINT
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
        sequelize.addConstraint('Sectors', {
            type: 'foreign key',
            fields: ['sectorUnitId'],
            references: {
                table: 'Units',
                field: 'unitId'
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
        sequelize.addConstraint('Sectors', {
            type: 'foreign key',
            fields: ['sectorsId'],
            references: {
                table: 'Units',
                field: 'unitId'
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        })
    })

    await sequelize.createTable('MachineTypes', {
        machineTypeId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false
        },
        description: {
            type: DataType.STRING
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        }
    })

    await sequelize.createTable('Brands', {
        brandId: {
            type: DataType.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataType.STRING,
        },
        description: {
            type: DataType.STRING
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        }
    })

    await sequelize.createTable('AssetModels', {
        assetModelId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false
        },
        description: {
            type: DataType.STRING
        },
        assetModelTypeId: {
            type: DataType.BIGINT
        },
        modelBrandId: {
            type: DataType.BIGINT
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
        sequelize.addConstraint('AssetModels', {
            type: 'foreign key',
            fields: ['assetModelTypeId'],
            references: {
                table: 'MachineTypes',
                field: 'machineTypeId'
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
        sequelize.addConstraint('AssetModels', {
            type: 'foreign key',
            fields: ['modelBrandId'],
            references: {
                table: 'Brands',
                field: 'brandId'
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        })
    });

    await sequelize.createTable('Colors', {
        colorId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        }
    })

    await sequelize.createTable('AssetModelColors', {
        assetModel_id: {
            type: DataType.BIGINT,
            allowNull: false
        },
        color_id: {
            type: DataType.BIGINT,
            allowNull: false
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
        sequelize.addConstraint('AssetModelColors', {
            type: 'foreign key',
            fields: ['assetModel_id'],
            references: {
                table: 'AssetModels',
                field: 'assetModelId'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        sequelize.addConstraint('AssetModelColors', {
            type: 'foreign key',
            fields: ['color_id'],
            references: {
                table: 'Colors',
                field: 'colorId'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        })
    })

    await sequelize.createTable('Assets', {
        assetId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        tag: {
            type: DataType.STRING,
            allowNull: false,
            unique: true
        },
        location: {
            type: DataType.STRING,
            allowNull: true
        },
        provider: {
            type: DataType.STRING,
            allowNull: true
        },
        purchaseDate: {
            type: DataType.DATE,
            allowNull: true
        },
        serialNumber: {
            type: DataType.STRING,
            allowNull: true
        },
        qrCodePath: {
            type: DataType.STRING,
            allowNull: true
        },
        assetSector: {
            type: DataType.BIGINT,
            allowNull: true
        },
        assetsMachineType: {
            type: DataType.BIGINT,
            allowNull: true
        },
        assetsAssetModelId: {
            type: DataType.BIGINT,
            allowNull: true
        },
        colorAssetId: {
            type: DataType.BIGINT,
            allowNull: true
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: true
        },
        assetBrand: {
            type: DataType.BIGINT,
            allowNull: true,
        }

    }).then(() => {
        sequelize.addConstraint('Assets', {
            type: 'foreign key',
            fields: ['assetSector'],
            references: {
                table: 'Sectors',
                field: 'sectorId'
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
        sequelize.addConstraint('Assets', {
            type: 'foreign key',
            fields: ['assetBrand'],
            references: {
                table: 'Brands',
                field: 'brandId'
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });

        sequelize.addConstraint('Assets', {
            type: 'foreign key',
            fields: ['assetsAssetModelId'],
            references: {
                table: 'AssetModels',
                field: 'assetModelId'
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
        sequelize.addConstraint('Assets', {
            type: 'foreign key',
            fields: ['assetsMachineType'],
            references: {
                table: 'MachineTypes',
                field: 'machineTypeId'
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
        sequelize.addConstraint('Assets', {
            type: 'foreign key',
            fields: ['colorAssetId'],
            references: {
                table: 'Colors',
                field: 'colorId'
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
    });

    await sequelize.createTable('Composites', {
        compositeId: {
            type: DataType.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataType.STRING,
        },
        tag: {
            type: DataType.STRING,
            unique: true
        },
        qrCodePath: {
            type: DataType.STRING
        },
        assetComponentsId: {
            type: DataType.BIGINT,
            allowNull: true
        },
        parentFk: {
            type: DataType.BIGINT
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
        sequelize.addConstraint('Composites', {
            type: 'foreign key',
            fields: ['assetComponentsId'],
            references: {
                table: 'Assets',
                field: 'assetId'
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        })
    })

    await sequelize.createTable('ActivityTemplates', {
        activityTemplateId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: true
        },
        description: {
            type: DataType.STRING,
            allowNull: true
        },

        createdAt: {
            type: DataType.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: true
        },
        assetId: {
            type: DataType.BIGINT,
        },
        compositeId: {
            type: DataType.BIGINT,
        }


    }).then(() => {
        sequelize.addConstraint('ActivityTemplates', {
            type: 'foreign key',
            fields: ['compositeId'], // Nombre correcto del campo
            references: {
                table: 'Composites',
                field: 'compositeId',
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
    }).then(() => {
        sequelize.addConstraint('ActivityTemplates', {
            type: 'foreign key',
            fields: ['assetId'], // Nombre correcto del campo
            references: {
                table: 'Assets',
                field: 'assetId'
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
    });

    await sequelize.createTable('Users', {
        userId: {
            type: DataType.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataType.STRING,
            unique: true
        },
        password: {
            type: DataType.STRING
        },

        email: {
            type: DataType.STRING
        },

        lastName: {
            type: DataType.STRING
        },
        name: {
            type: DataType.STRING
        },

        phone: {
            type: DataType.STRING
        },

        cargo: {
            type: DataType.STRING
        },

        codeArea: {
            type: DataType.STRING
        },

        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        }, /////
        activated: DataType.BOOLEAN,
        visible: DataType.BOOLEAN
    })


    await sequelize.createTable('Profiles', {
        profileId: {
            type: DataType.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataType.STRING,
            allowNull: true, // Change allowNull to true to allow null values
        },

        lastName: {
            type: DataType.STRING,
            allowNull: true, // Allow null values for lastName
        },

        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        },
        userProfileFk: {
            type: DataType.BIGINT
        }
    }).then(() => {
        sequelize.addConstraint('Profiles', {
            type: 'foreign key',
            fields: ['userProfileFk'],
            references: {
                table: 'Users',
                field: 'userId'
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
    })

    await sequelize.createTable('WOStates', {
        wostateId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        }
    })

    await sequelize.createTable('MaintenancePlanDetails', {
        maintenancePlanDetailId: {
            type: DataType.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataType.STRING,
        description: DataType.STRING,
        dateHourGenerated: DataType.DATE,
        dateHourSchedueled: DataType.DATE,
        dateHourStarted: DataType.DATE,
        dateHourCompleted: DataType.DATE,
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        },
        daysOfWeekFk: {
            type: DataType.INTEGER,
            allowNull: true,
        },

        assetMPDetailFk: DataType.BIGINT,
        wostateFk: DataType.BIGINT,
        maintenancePlanDetailFk: DataType.BIGINT,




    }).then(() => {
        sequelize.addConstraint('MaintenancePlanDetails', {
            type: 'foreign key',
            fields: ['assetMPDetailFk'],
            references: {
                table: 'Assets',
                field: 'assetId'
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });

        sequelize.addConstraint('MaintenancePlanDetails', {
            type: 'foreign key',
            fields: ['maintenancePlanDetailFk'],
            references: {
                table: 'Profiles',
                field: 'profileId',
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
        sequelize.addConstraint('MaintenancePlanDetails', {
            type: 'foreign key',
            fields: ['wostateFk'],
            references: {
                table: 'WOStates',
                field: 'wostateId',
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
    })


    await sequelize.createTable('Activities', {
        activityId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },

        dateHourStart: {
            type: DataType.DATE
        },
        dateHourEnd: {
            type: DataType.DATE,
            allowNull: true,
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        },
        description: {
            type: DataType.STRING,
            allowNull: false
        },
        name: {
            type: DataType.STRING,
            allowNull: false
        },

        activityMPDFk: DataType.BIGINT,
        activityAsigneeFk: DataType.BIGINT,
        activityTemplateFk: DataType.BIGINT,
        compositeFk: DataType.BIGINT,
        activityTMPD: DataType.BIGINT,
        assetMPDetailFk: DataType.BIGINT,

    }).then(() => {
        sequelize.addConstraint('Activities', {
            type: 'foreign key',
            fields: ['activityTemplateFk'],
            references: {
                table: 'ActivityTemplates',
                field: 'activityTemplateId'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });

        sequelize.addConstraint('Activities', {
            type: 'foreign key',
            fields: ['activityMPDFk'],
            references: {
                table: 'MaintenancePlanDetails',
                field: 'maintenancePlanDetailId'
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
        sequelize.addConstraint('Activities', {
            type: 'foreign key',
            fields: ['activityAsigneeFk'],
            references: {
                table: 'Profiles',
                field: 'profileId',
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
        sequelize.addConstraint('Activities', {
            type: 'foreign key',
            fields: ['compositeFk'],
            references: {
                table: 'Composites',
                field: 'compositeId',
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
        sequelize.addConstraint('Activities', {
            type: 'foreign key',
            fields: ['assetMPDetailFk'],
            references: {
                table: 'Assets',
                field: 'assetId' // Use the correct column name here
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
    })

    await sequelize.createTable('Providers', {
        providerId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        },
        name: {
            type: DataType.STRING,
            allowNull: false
        },
        phone: {
            type: DataType.STRING,
            allowNull: false
        },

        address: {
            type: DataType.STRING,
            allowNull: false
        },
        codeArea: {
            type: DataType.STRING,
       
        },
        
        mail: {
            type: DataType.STRING,
    
        }
    });

    await sequelize.createTable('BrandProviders', {
        brand_id: {
            type: DataType.BIGINT,
            primaryKey: true,
            allowNull: false
        },
        provider_id: {
            type: DataType.BIGINT,
            primaryKey: true,
            allowNull: false
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
        sequelize.addConstraint('BrandProviders', {
            type: 'foreign key',
            fields: ['brand_id'],
            references: {
                table: 'Brands',
                field: 'brandId',
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
        sequelize.addConstraint('BrandProviders', {
            type: 'foreign key',
            fields: ['provider_id'],
            references: {
                table: 'Providers',
                field: 'providerId',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        });
    });

    await sequelize.createTable('CompositeComponents', {
        compositeComponentId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        },
        componentFk: DataType.INTEGER,
        parentFk: DataType.INTEGER,
        compositeType: DataType.STRING
    });

    await sequelize.createTable('Emails', {
        emailId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        },
        email: {
            type: DataType.STRING,
            allowNull: false
        },
        profileEmailFk: DataType.BIGINT
    }).then(() => {
        sequelize.addConstraint('Emails', {
            type: 'foreign key',
            fields: ['profileEmailFk'],
            references: {
                table: 'Profiles',
                field: 'profileId',
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
    });

    await sequelize.createTable('PurchaseData', {
        purchaseDataId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        },
        purchaseDate: DataType.DATE,
        warrantyDate: DataType.DATE,
        purchaseAssetId: DataType.BIGINT,
        purchaseProviderId: DataType.BIGINT
    }).then(() => {
        sequelize.addConstraint('PurchaseData', {
            type: 'foreign key',
            fields: ['purchaseAssetId'],
            references: {
                table: 'Assets',
                field: 'assetId',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        });
        sequelize.addConstraint('PurchaseData', {
            type: 'foreign key',
            fields: ['purchaseProviderId'],
            references: {
                table: 'Providers',
                field: 'providerId',
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
    });
    await sequelize.createTable('ReadingTags', {
        readingTagId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        },
        tag: DataType.STRING,
        name: DataType.STRING
    });

    await sequelize.createTable('ReadingTypes', {
        readingTypeId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        },
        tag: DataType.STRING,
        name: DataType.STRING
    });

    await sequelize.createTable('SpareComponentHistories', {
        spareComponentHistoryId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        },
        compositeHistoryFk: DataType.INTEGER
    }).then(() => {
        sequelize.addConstraint('SpareComponentHistories', {
            type: 'foreign key',
            fields: ['compositeHistoryFk'],
            references: {
                table: 'Composites',
                field: 'compositeId',
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
    });

    await sequelize.createTable('SpareComponents', {
        spareComponentId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        },
        dateInstalled: {
            type: DataType.DATE,
            allowNull: false
        },
        name: DataType.STRING,
        dateUninstalled: DataType.DATE,
        spareComponentHistoryFk: DataType.BIGINT
    }).then(() => {
        sequelize.addConstraint('SpareComponents', {
            type: 'foreign key',
            fields: ['spareComponentHistoryFk'],
            references: {
                table: 'SpareComponentHistories',
                field: 'spareComponentHistoryId',
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
    });

    await sequelize.createTable('Readings', {
        readingId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        },
        date: DataType.DATE,
        value: DataType.DOUBLE,
        unit: DataType.STRING,
        spareComponentReadingFk: DataType.BIGINT,
        readingTagFk: DataType.BIGINT,
        readingTypeFk: DataType.BIGINT
    }).then(() => {
        sequelize.addConstraint('Readings', {
            type: 'foreign key',
            fields: ['readingTagFk'],
            references: {
                table: 'ReadingTags',
                field: 'readingTagId',
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
        sequelize.addConstraint('Readings', {
            type: 'foreign key',
            fields: ['readingTypeFk'],
            references: {
                table: 'ReadingTypes',
                field: 'readingTypeId',
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
        sequelize.addConstraint('Readings', {
            type: 'foreign key',
            fields: ['spareComponentReadingFk'],
            references: {
                table: 'SpareComponents',
                field: 'spareComponentId',
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
    });

    await sequelize.createTable('Roles', {
        roleId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        },
        name: {
            type: DataType.STRING,
            allowNull: false
        }
    });

    await sequelize.createTable('Sessions', {
        sessionId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        },
        date: DataType.DATE,
        duration: DataType.INTEGER
    }).then(() => {
        sequelize.addConstraint('Sessions', {
            type: 'foreign key',
            fields: ['sessionId'],
            references: {
                table: 'Users',
                field: 'userId',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        });
    });

    await sequelize.createTable('Spares', {
        spareId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        },
        name: DataType.STRING,
        sparesFk: DataType.INTEGER,
        componentFk: DataType.INTEGER
    });

    await sequelize.createTable('TaskTemplates', {
        taskTemplateId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        },
        name: {
            type: DataType.STRING,
            allowNull: false
        },
        number: DataType.INTEGER,
        optional: {
            type: DataType.BOOLEAN,
            defaultValue: false
        },
        activityTemplateFK: DataType.BIGINT
    }).then(() => {
        sequelize.addConstraint('TaskTemplates', {
            type: 'foreign key',
            fields: ['activityTemplateFK'],
            references: {
                table: 'ActivityTemplates',
                field: 'activityTemplateId',
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
    });

    await sequelize.createTable('Tasks', {
        taskId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        },
        dateTimeDone: DataType.DATE,
        done: {
            type: DataType.BOOLEAN,
            defaultValue: false
        },
        activityTaskFk: DataType.BIGINT,
        taskTemplateFk: DataType.BIGINT
    }).then(() => {
        sequelize.addConstraint('Tasks', {
            type: 'foreign key',
            fields: ['activityTaskFk'],
            references: {
                table: 'Activities',
                field: 'activityId',
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
        sequelize.addConstraint('Tasks', {
            type: 'foreign key',
            fields: ['taskTemplateFk'],
            references: {
                table: 'TaskTemplates',
                field: 'taskTemplateId',
            },
            onUpdate: 'cascade',
            onDelete: 'set null'
        });
    });

    await sequelize.createTable('UserRoles', {
        userId: {
            type: DataType.BIGINT,
            primaryKey: true,
            allowNull: false
        },
        roleId: {
            type: DataType.BIGINT,
            primaryKey: true,
            allowNull: false
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
        sequelize.addConstraint('UserRoles', {
            type: 'foreign key',
            fields: ['roleId'],
            references: {
                table: 'Roles',
                field: 'roleId',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        });
        sequelize.addConstraint('UserRoles', {
            type: 'foreign key',
            fields: ['userId'],
            references: {
                table: 'Users',
                field: 'userId',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        });
    });

    await sequelize.createTable('UserStatuses', {
        userStatusId: {
            type: DataType.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        },
        name: DataType.STRING
    }).then(() => {
        sequelize.addConstraint('UserStatuses', {
            type: 'foreign key',
            fields: ['userStatusId'],
            references: {
                table: 'Users',
                field: 'userId',
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        });
    });



    return Promise.all([])

}

export const down: Migration = ({ context: sequelize }) => {

    return sequelize.dropAllTables();
}