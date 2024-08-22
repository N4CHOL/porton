import { Sequelize } from 'sequelize-typescript';
import { ActivityTemplate } from '../app/activitiesTemplates/models/activityTemplate.model';
import { TaskTemplate } from '../app/activitiesTemplates/models/taskTemplate.model';
import { Asset } from '../app/assets/models/asset.model';
import { PurchaseData } from '../app/assets/models/purchaseData.model';
import BrandProvider from '../app/brandProvider/brandProvider.model';
import { CompositeComponent } from '../app/assets/models/composite-component.model';
import { Composite } from '../app/assets/models/composite.model';
import { SpareComponent } from '../app/assets/models/spare-component.model';
import { SpareComponentHistory } from '../app/assets/models/spare-component-history.model';
import { Spare } from '../app/assets/models/spare.model';
import { Business } from '../app/business/models/business.model';
import { Sector } from '../app/business/models/sector.model';
import { TypeUnit } from '../app/business/models/typeUnit.model';
import { Unit } from '../app/business/models/unit.model';
import { AssetModel } from '../app/equipments/models/asset-model.model';
import AssetModelColor from '../app/equipments/models/assetModelColor';
import { Brand } from '../app/equipments/models/brand.model';
import { Color } from '../app/equipments/models/color.model';
import { MachineType } from '../app/equipments/models/machine-type.model';
import { Profile } from '../app/profile/models/profile.model';
import { Provider } from '../app/provider/model/provider.model';
import { ReadingTag } from '../app/readings/models/reading-tag.model';
import { ReadingType } from '../app/readings/models/reading-type.model';
import { Reading } from '../app/readings/models/reading.model';
import { Access } from '../app/user/models/access.model';
import { Role } from '../app/user/models/role.model';
import { Session } from '../app/user/models/session.model';
import { UserStatus } from '../app/user/models/user-status.model';
import { Activity } from '../app/activities/models/activity.model';
import { Task } from '../app/activities/models/task.model';
import { MaintenancePlanDetail } from '../app/maintenance-plan/models/maintenance-plan-detail.model';
import { WOState } from '../app/maintenance-plan/models/wostate.model';
import { ActState } from '../app/activities/models/actstate.model';
import { Email } from '../app/profile/models/email.model';
import { UserRole } from '../app/user/models/user-role.model';
import { PhysicalComponent } from '../app/assets/models/physical-component.model';
import { Attribute } from '../app/assets/models/attribute.model';
import { Feature } from '../app/user/models/feature.model';
import { Action } from '../app/user/models/action.model';
import { ActionAccess } from '../app/user/models/action-access.model';
import { RoleAccess } from '../app/user/models/role-access.model';
import { Priority } from '../app/shared/classes/priority.model';
import { SuspensionReason } from '../app/activities/models/suspensionReason.model';
import { TemplateActivTempl } from '../app/template-maintenance-plan/models/template-activity-template.model';
import { TemplateMPD } from '../app/template-maintenance-plan/models/template-maitenance-plan.model';
import { Recurrence } from '../app/template-maintenance-plan/models/recurrence.model';
import { ProductionLine } from '../app/production-line/models/production-line.model';
import { Observation } from '../app/assets/models/observation.model';
import ProductionLineAsset from '../app/production-line/models/production-line-asset.model';
import { Category } from '../app/shared/models/category.model';
import CategoryMPD from '../app/maintenance-plan/models/categoryMPD.model';
import categoryObservation from '../app/assets/models/category-observation.model';
import { WorState } from '../app/assets/models/worstate.model';
import { DaysOfWeek } from '../app/shared/classes/daysOfWeek.model';
import { MaintenancePlanDetailDaysOfWeek } from '../app/shared/classes/MaintenancePlanDetailDaysOfWeek.model';
import { OperatorNotifications } from '../app/operator-notifications/models/operator-notifications.model';
import { User } from '../app/user/models/user.model';

export const defineModels = (seq: Sequelize) => {

  seq.addModels([

    
    // Assets
    CompositeComponent,
    Asset,
    PurchaseData,
    Composite,
    Spare,
    SpareComponent,
    SpareComponentHistory,
    PhysicalComponent,
    Attribute,
    Observation,
    WorState,

    // Production Line
    ProductionLine,

    // Production Line Asset
    ProductionLineAsset,

    // Readings
    Reading,
    ReadingType,
    ReadingTag,

    // Business
    Business,
    Sector,
    TypeUnit,
    Unit,

    // Equipments
    AssetModel,
    Brand,
    Color,
    MachineType,
    AssetModelColor,

    // Profile
    Profile,
    Email,

    // Provider
    Provider,

    //OperatorNotifications
    OperatorNotifications,

    // User
    Access,
    Role,
    Session,
    UserStatus,
    User,
    UserRole,
    Feature,
    Action,
    ActionAccess,
    RoleAccess,

    // brandProvider
    BrandProvider,

    // Templates
    ActivityTemplate,
    TaskTemplate,
    TemplateActivTempl,
    TemplateMPD,
    Recurrence,

    // Activities
    Activity,
    Task,
    ActState,
    SuspensionReason,

    // MaintenancePlan
    MaintenancePlanDetail,
    WOState,

    // Shared
    Priority,


    DaysOfWeek,
    MaintenancePlanDetailDaysOfWeek,

    // Category
    Category,

    // CategoryRelations
    CategoryMPD,
    categoryObservation

  ]);


  

};