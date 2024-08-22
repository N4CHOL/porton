import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, DefaultScope, Model, NotNull, PrimaryKey, Scopes, Table } from "sequelize-typescript";
import { SpareComponent } from "../../assets/models/spare-component.model";
import { ReadingTag } from "./reading-tag.model";
import { IReadingType, ReadingType } from "./reading-type.model";

export interface IReading {
    readingId?: number;
    date?: Date;
    tag: string;
    value: string;
    readingType: IReadingType;
}

@DefaultScope(() => ({
    include: ['readingType', 'tag']
}))
@Table
export class Reading extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    public readingId!: number;

    @Column
    public date!: Date;

    @AllowNull(false)
    @Column(DataType.FLOAT)
    public value!: number;

    @Column
    public unit!: string;

    @BelongsTo(() => ReadingTag, 'readingTagFk')
    public tag!: ReadingTag

    @BelongsTo(() => ReadingType, 'readingTypeFk')
    public readingType!: ReadingType;

    @BelongsTo(() => SpareComponent, 'spareComponentReadingFk')
    public spareComponent!: SpareComponent;

}