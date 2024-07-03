import {
    Table,
    Model,
    AutoIncrement,
    PrimaryKey,
    Column,
    BeforeCreate,
    BeforeUpdate,
    HasOne,
    BelongsTo,
    AllowNull,
    DataType,
    Unique,
    HasMany,
    DefaultScope,
    BelongsToMany
} from 'sequelize-typescript';
import * as path from 'path';
import * as QRCode from 'qrcode';
import { AssetModel, IAssetModel } from '../../equipments/models/asset-model.model';
import { IPurchaseData, PurchaseData } from './purchaseData.model';
import { Color, IColor } from '../../equipments/models/color.model';

import { IMachineType, MachineType } from '../../equipments/models/machine-type.model';
import { ISector, Sector } from '../../business/models/sector.model';
import { Composite, IComposite } from './composite.model';
import { MaintenancePlanDetail } from '../../maintenance-plan/models/maintenance-plan-detail.model';
import { TemplateMPD } from '../../template-maintenance-plan/models/template-maitenance-plan.model';
import { Observation } from './observation.model';
import { IProductionLine, ProductionLine } from '../../production-line/models/production-line.model';
import ProductionLineAsset from '../../production-line/models/production-line-asset.model';
import { ActivityTemplate } from '../../activitiesTemplates/models/activityTemplate.model';
import { Brand, IBrand } from '../../equipments/models/brand.model';

export interface IAsset {
    assetId?: number;
    name?: string;
    tag: string;
    serialNumber?: string | null;
    qrCodePath?: string | null;
    location?: string | null;
    assetModel?: IAssetModel | null;
    purchaseData?: IPurchaseData | null;
    color?: IColor | null;
    sector?: ISector | null;
    brand?: IBrand | null;
    assetMachineType?: IMachineType | null;
    components?: IComposite[] | null;
    productionLine?: IProductionLine[] | null;

}
@DefaultScope(() => ({ include: [AssetModel, PurchaseData] }))
@Table
export class Asset extends Model implements IAsset {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    public assetId!: number;

    @Column
    public name!: string;

    @Unique
    @AllowNull(false)
    @Column
    public tag!: string;

    @Column(DataType.STRING)
    public location!: string | null;

    @Column(DataType.STRING)
    public serialNumber!: string | null;

    @Column
    purchaseDate!: Date;

    @Column
    public qrCodePath!: string;

    @HasMany(() => ActivityTemplate, {
        foreignKey: 'assetId',
    })
    public activityTemplates!: ActivityTemplate[];


    @BelongsTo(() => Sector, 'assetSector')
    public sector!: Sector | null;

    @BelongsTo(() => Brand, 'assetBrand')
    public brand!: Brand | null;

    @BelongsTo(() => MachineType, 'assetsMachineType')
    public assetMachineType!: MachineType | null;

    @BelongsTo(() => AssetModel, 'assetsAssetModelId')
    public assetModel!: AssetModel | null;

    @HasOne(() => PurchaseData, {
        foreignKey: 'purchaseAssetId',
        onDelete: 'CASCADE'
    })
    public purchaseData!: PurchaseData | null;

    @BelongsTo(() => Color, 'colorAssetId')
    public color!: Color | null;

    @HasMany(() => Composite, 'assetComponentsId')
    public components!: Composite[] | null;

    @HasMany(() => MaintenancePlanDetail, 'assetMPDetailFk')
    public maintPlanDetails!: MaintenancePlanDetail[] | null;

    @HasMany(() => TemplateMPD, 'templMPDTAssetFK')
    public templateMPD!: TemplateMPD[] | null;

    @HasMany(() => Observation, {
        foreignKey: 'observationAssetFK',
        constraints: false,
        foreignKeyConstraint: false
    })
    public observations!: Observation[] | null;
    @BelongsToMany(() => ProductionLine, () => ProductionLineAsset)
    public productionLine!: ProductionLine[] | null;

    @BeforeCreate
    @BeforeUpdate
    static createQr(instance: Asset) {
        const qrCodePath: string = path.join(`src/assets/img/`, `comp-${instance.tag}.png`);
        const filename = path.join(process.cwd(), qrCodePath);
        instance.qrCodePath = qrCodePath;
        QRCode.toFile(filename, JSON.stringify(instance), err => {
            if (err) return;

        });
    }

    @BeforeCreate
    @BeforeUpdate
    static upperCase(instance: Asset) {
        instance.tag = instance.tag.toUpperCase().split(' ').join('');
    }
}