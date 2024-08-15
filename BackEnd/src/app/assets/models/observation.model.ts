import { AutoIncrement, BelongsTo, BelongsToMany, Column, DefaultScope, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Profile } from "../../profile/models/profile.model";
import { Category } from "../../shared/models/category.model";
import { User } from "../../user/models/user.model";
import { Asset } from "./asset.model";
import { CategoryObservation } from "./category-observation.model";
import { Composite } from "./composite.model";
import { SpareComponent } from "./spare-component.model";
import { WorState } from "./worstate.model";

export interface IObservation {
    description: string;
    state: WorState;
    asset: Asset;
    spare?: SpareComponent;
    responsible: Profile;
    categories?: Category[];
}
export interface IObservationQuery {
    description: string;
    state: WorState;
    asset: Asset;
    component?: Composite;
    responsible: User;
    categories?: Category[];
}
@DefaultScope(() => ({include:[WorState]}))
@Table
export class Observation extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    public observationId!: number;

    @Column
    public description!: string;

    @BelongsTo(() => WorState, 'worStateFk')
    public state!: WorState;

    @BelongsTo(() => SpareComponent, 'observationSpareComponentFK')
    public spare!: SpareComponent;

    @BelongsTo(() => Asset, 'observationAssetFK')
    public asset!: Asset;

    @BelongsTo(() => Profile, 'observationResponsibleFK')
    public responsible!: Profile;

    @BelongsToMany(() =>  Category, () => CategoryObservation)
    public categories!: Category[];
}