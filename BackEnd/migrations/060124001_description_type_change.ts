//Cambio de String a String(3000) para limitar los inputs en textAreas varios del sistema

import { DataType } from "sequelize-typescript";
import { Migration } from "../src/app";

export const up: Migration = async({context: sequelize})=>{
    await sequelize.changeColumn('MachineTypes','description',{
        type: DataType.STRING(3000)
    })
    await sequelize.changeColumn('Brands','description',{
        type: DataType.STRING(3000)
    })
    await sequelize.changeColumn('AssetModels','description',{
        type: DataType.STRING(3000)
    })
    await sequelize.changeColumn('MaintenancePlanDetails','description',{
        type: DataType.STRING(3000)
    })
    await sequelize.changeColumn('PhysicalComponents','description',{
        type: DataType.STRING(3000)
    })
    await sequelize.changeColumn('Attributes','description',{
        type: DataType.STRING(3000)
    })
    await sequelize.changeColumn('TemplateMPD','description',{
        type: DataType.STRING(3000)
    })
    await sequelize.changeColumn('Activities','observation',{
        type: DataType.STRING(3000)
    })
    await sequelize.changeColumn('ProductionLines','description',{
        type: DataType.STRING(3000)
    })

    return Promise.all([])
}

export const down: Migration = async ({context: sequelize})=>{
    await sequelize.changeColumn('MachineTypes','description',{
        type: DataType.STRING
    })
    await sequelize.changeColumn('Brands','description',{
        type: DataType.STRING
    })
    await sequelize.changeColumn('AssetModels','description',{
        type: DataType.STRING
    })
    await sequelize.changeColumn('MaintenancePlanDetails','description',{
        type: DataType.STRING
    })
    await sequelize.changeColumn('PhysicalComponents','description',{
        type: DataType.TEXT
    })
    await sequelize.changeColumn('Attributes','description',{
        type: DataType.STRING
    })
    await sequelize.changeColumn('TemplateMPD','description',{
        type: DataType.STRING
    })
    await sequelize.changeColumn('Activities','observation',{
        type: DataType.STRING
    })
    await sequelize.changeColumn('ProductionLines','description',{
        type: DataType.STRING
    })

    return Promise.all([])
}