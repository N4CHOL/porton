import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Access } from "./access.model";

export interface IFeature {
    featureId?: number;
    name: string;
}

@Table({ tableName: 'Features' })
export class Feature extends Model implements IFeature {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    public featureId!: number;

    @AllowNull(false)
    @Column
    public name!: string;

    @HasMany(() => Access, 'featureAccessFk')
    public accesses!: Access[];

}