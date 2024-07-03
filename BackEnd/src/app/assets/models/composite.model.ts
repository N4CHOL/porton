import * as path from 'path';
import * as QRCode from 'qrcode';
import { DataType, AutoIncrement, Column, HasMany, PrimaryKey, Table, Model, BelongsTo, BelongsToMany, DefaultScope, Scopes, BeforeCreate, BeforeUpdate, Unique, HasOne, AfterRestore, AfterFind, AfterCreate, Sequelize } from "sequelize-typescript";
import sequelize from 'sequelize';

import { Asset, IAsset } from "./asset.model";
import { CompositeComponent } from "./composite-component.model";
import { ISpareComponentHistory, SpareComponentHistory } from './spare-component-history.model';
import { Spare } from "./spare.model";
import { PhysicalComponent } from './physical-component.model';
import { Activity } from '../../activities/models/activity.model';
import { ITemplateActivTempl, TemplateActivTempl } from '../../template-maintenance-plan/models/template-activity-template.model';
import { ActivityTemplate } from '../../activitiesTemplates/models/activityTemplate.model';


export interface IComposite {
    compositeId?: number;
    name: string;
    tag: string;
    qrCodePath?: string;
    history?: ISpareComponentHistory;
    asset?: IAsset | null;
    hasChildren?: boolean;
    physicalComponent?: PhysicalComponent | null;
    
}

// @DefaultScope(() => ({
//     attributes: ['name', 'tag'],
//     include: [{
//         model: Composite,
//         as: 'components',
//         attributes: ['name','tag']
//     }]
// }))
@Scopes(() => ({
    full: {
        include: [{
            model: Composite
            , as: 'components',

        }, 'spares', 'history']
    },
    components: {
        include: ['components']
    },
    spares: {
        include: ['spares']
    }, lean: {
        attributes: ['compositeId', 'tag']
    },
    history: { include: ['history'] },
    hasChildren: {
        attributes: {
            include: [
                [sequelize.literal(
                    `(
        SELECT CASE WHEN EXISTS (SELECT 1 
            FROM "Composites" as "BEComp" INNER JOIN "Composites" ON "BEComp"."compositeId" = "Composites"."parentFk" 
             AND "BEComp"."tag" = "Composite"."tag")
            THEN TRUE
            ELSE FALSE
            END
       )`
                ), 'hasChildren']
            ]
        }

    }
}))
@Table
export class Composite extends Model implements IComposite {

    @AutoIncrement
    @PrimaryKey
    @Column
    public compositeId!: number;

    @Column
    public name!: string;

    @Unique
    @Column
    public tag!: string;

    @Column
    public qrCodePath!: string;

    @Column
    public parentAssetTag!: string;


    @BelongsTo(() => Asset, 'assetComponentsId')
    public asset!: Asset | null;

    @HasOne(() => SpareComponentHistory, 'compositeHistoryFk')
    public history!: SpareComponentHistory;

    @HasMany(() => ActivityTemplate, {
        foreignKey: 'compositeId',
    })
    public activityTemplates!: ActivityTemplate[];


    @BelongsTo(() => Composite, {
        foreignKey: 'parentFk',
        constraints: false,
        foreignKeyConstraint: false
    })
    public parent!: Composite;

    @HasMany(() => Composite, {
        foreignKey: 'parentFk',
        as:'components',
        constraints: false,
        foreignKeyConstraint: false
    })
    public components!: Composite[];

    @HasMany(() => Spare, {
        foreignKey: 'sparesFk',
        constraints: false,
        foreignKeyConstraint: false
    })
    public spares!: Spare[]

    @BelongsTo(() => PhysicalComponent, {
        foreignKey: 'compositePComponentFK',
        onDelete: 'SET NULL',
        foreignKeyConstraint: false
    })
    public physicalComponent!: PhysicalComponent | null;
    

    @HasMany(() => TemplateActivTempl, 'templATCompositeFK')
    public tmplActivTmpl!: TemplateActivTempl[];

    

    @BeforeCreate
    @BeforeUpdate
    static createQr(instance: Composite) {
        const qrCodePath: string = path.join(`src/assets/img/`, `comp-${instance.tag}.png`);
        const filename = path.join(process.cwd(), qrCodePath);
        instance.qrCodePath = qrCodePath;
        QRCode.toFile(filename, JSON.stringify(instance), err => {
            if (err) return;
       
        });
    }

    @HasMany(() => Activity, {
        foreignKey: 'activityCompositeFK',
        onDelete: 'SET NULL',
        foreignKeyConstraint: false
    })
    public activities!: Activity[];


}