import { AfterCreate, AfterUpdate, AutoIncrement, BeforeCreate, BeforeUpdate, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Reading } from "./reading.model";

@Table
export class ReadingTag extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    public readingTagId!: number;

    @Column
    public tag!: string;

    @Column
    public name!: string;

    @HasMany(() => Reading, 'readingTagFk')
    public readings!: Reading[];

    @BeforeCreate
    @BeforeUpdate
    public static createName(instance: ReadingTag) {
        let tag = instance.tag.toLowerCase();
        instance.name = '';
        tag.split('_').forEach((val: string, index: number, array: string[]) => {
            instance.name += (val.charAt(0).toUpperCase() + val.slice(1));
            if (index < array.length - 1) instance.name += ' ';
        })
    }

    @BeforeCreate
    @BeforeUpdate
    public static upperCaseTag(instance: ReadingTag) {
        instance.tag = instance.tag.toUpperCase();
    }
}