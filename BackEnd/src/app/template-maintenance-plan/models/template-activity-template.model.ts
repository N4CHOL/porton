import { Table, Model, AutoIncrement, PrimaryKey, Column, DataType, HasOne, BelongsTo } from "sequelize-typescript";
import { ActivityTemplate } from "../../activitiesTemplates/models/activityTemplate.model";
import { Composite } from "../../assets/models/composite.model";
import { TemplateMPD } from "./template-maitenance-plan.model";


export interface ITemplateActivTempl {
    templateActivTemplId: number;
    activityTmpl: ActivityTemplate;
    composite: Composite;
}

@Table({ tableName: 'TemplateActivTempl' })
export class TemplateActivTempl extends Model implements ITemplateActivTempl {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    public templateActivTemplId!: number;

    @BelongsTo(() => ActivityTemplate, 'templATActivTmplFK')
    public activityTmpl!: ActivityTemplate;

    @BelongsTo(() => Composite, 'templATCompositeFK')
    public composite!: Composite;

    @BelongsTo(() => TemplateMPD, 'templMPDTActivTmplFK')
    public templateMPD!: TemplateMPD;

}