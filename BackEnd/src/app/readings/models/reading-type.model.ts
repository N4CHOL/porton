import { AutoIncrement, BelongsToMany, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { IReading, Reading } from "./reading.model";

export interface IReadingType{
    readingTypeId?: number;
    name: string;
    readings: IReading[]
}

@Table
export class ReadingType extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    public readingTypeId!: number;

    @Column
    public name!: string;

    @HasMany(() => Reading, 'readingTypeFk')
    public readings!: Reading[]
}