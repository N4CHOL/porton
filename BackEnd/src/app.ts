// Basic imports
import { Sequelize } from 'sequelize-typescript';
import express, { Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { Umzug, SequelizeStorage } from 'umzug';

// Environment
import { postgreConfig } from './environments/environments';
import { postgreUser } from './environments/secrets';

//Routers
import userRouter from './app/user/user.routes';
import businessRouter from './app/business/business.routes';
import typeUnitsRouter from './app/business/type-units.routes';
import unitsRouter from './app/business/unit.routes';
import roleRouter from './app/user/roles.routes';
import assetRouter from './app/assets/asset.routes';
import authRouter from './app/login/auth.routes';
import componentRouter from './app/assets/component.routes';
import readingsRouter from './app/readings/readings.routes';
import maintenancePlanRouter from './app/maintenance-plan/maintenance-plan.routes';
import profileRouter from './app/profile/profile.routes';
import activityRouter from './app/activities/activity.routes';
import activityTemplateRouter from './app/activitiesTemplates/activityTemplate.routes';
import providerRouter from './app/provider/provider.routes';
import physicalComponentRouter from './app/assets/physical-component.routes';
import sharedRouter from './app/shared/shared.routes';
import suspensionRouter from './app/activities/suspensionReason.routes';
import templateWORouter from './app/template-maintenance-plan/template-maintenance-plan.routes';
import productionLineRouter from './app/production-line/production-line.routes';
import observationRouter from './app/assets/observation.routes'
import categoryRouter from './app/shared/category.routes';
import operatorNotificationsRouter from './app/operator-notifications/operator-notificatios.routes';

// Controllers
import * as brandController from './app/equipments/controllers/brand.controller';
import * as machineTypeController from './app/equipments/controllers/machineType.controller';
import * as modelController from './app/equipments/controllers/asset-model.controller';
import * as colorController from './app/equipments/controllers/color.controller';
import * as assetController from './app/assets/controllers/asset.controller';

//DB imports
import { testDbConnection } from './database/init/init_database';
import { defineModels } from './database/model-definitions';

// Test Scripts
import * as initBasics from './scripts/000_init-basics';
import { QueryInterface } from 'sequelize/types';
import { OperatorNotifications } from './app/operator-notifications/models/operator-notifications.model';

// Test database Connection

// Connect to database.
const sequelize = new Sequelize({
  dialect: 'postgres',
  database:process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER || postgreUser.username,
  password: process.env.DATABASE_PASS || postgreUser.password,
  host: process.env.DATABASE_URL || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
});
//Check if database exists & create
try {
  testDbConnection(sequelize).then(() => {
    sequelize
      .getQueryInterface()
      .showAllSchemas()
      .then((val: any) => {

      });
  });
} catch (e) {

}

try {
  if (process.env.PRODUCTION === 'true') {
    var umzug = new Umzug({
      migrations: { glob: 'build/migrations/*.js' },
      context: sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize }),
      logger: console,
    });
  } else {
    var umzug = new Umzug({
      migrations: { glob: 'migrations/*.ts' },
      context: sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize }),
      logger: console,
    });
  }
  (async () => {
    await umzug.up();
  })().then(() => {
    testDbConnection(sequelize).then(() => {
      // Define Models
      defineModels(sequelize);
      // Init hardcoded Values
      initBasics.initBasics();
    });
  });
} catch (e) {

}

process.on('uncaughtException', (err:any) => {
  console.error(`Uncaught Exception: ${err.message}`)
  // process.exit(1)
})
process.on('unhandledRejection', (reason:any, promise:any) => {
  console.log('Unhandled rejection at ', promise, `reason: ${reason}`)
  // process.exit(1)
})
export type Migration = typeof umzug._types.migration;

// Define the app.
const app = express();

app.set('port', process.env.PORT || 3001);
app.use(bodyParser.json());
app.use(cors({ origin: '*', credentials: true }));
app.use(morgan('tiny'));
app.use(helmet());

const router: Router = Router()
// # Endpoints
// ## User
router.use('/user', userRouter);

// ## Profiles
router.use('/profile', profileRouter);

// ## Providers
router.use('/provider', providerRouter);

// ## Business
router.use('/business', businessRouter);
router.use('/typeUnits', typeUnitsRouter);
router.use('/unit', unitsRouter);

// ## Roles
router.use('/role', roleRouter);

// ## Brands
router.post('/brand', brandController.postBrand);
router.get('/brand/:id', brandController.getBrand);
router.get('/brands', brandController.getBrands);
router.put('/brand/:id', brandController.updateBrand);
router.delete('/brand/:id', brandController.deleteBrand);

//## MachineTypes
router.get('/machineTypes', machineTypeController.getMachineTypes);
router.get('/machineType/:id', machineTypeController.getMachineType);
router.post('/machineType', machineTypeController.postMachineType);
router.delete('/machineType/:id', machineTypeController.deleteMachinetype);
router.put('/machineType/:id', machineTypeController.updateMachineType);

//## Models
router.get('/models', modelController.getAllModels);
router.get('/models/:brand?', modelController.getModels);
router.get('/model/:id', modelController.getModel);
router.post('/model', modelController.postModel);
router.put('/model/:id', modelController.updateModel);
router.delete('/model/:id', modelController.deleteModel);

// Colors
router.get('/colors', colorController.getColors);
router.get('/colors/:assetModelId', colorController.getColorsbyModel);

// ## Assets
router.use('/asset', assetRouter);
router.use('/component', componentRouter);
router.get('/assetsWO', assetController.getAssetsWO);
router.use('/physical-component', physicalComponentRouter);

router.use('/observation', observationRouter);

// ## ProductionLines
router.use('/production-line', productionLineRouter)

// ## ActivityTemplate
router.use('/activitiesTemplate', activityTemplateRouter);

// ## Activities
router.use('/activity', activityRouter);
router.use('/suspensionReason', suspensionRouter);

// ## Auth
router.use('/auth', authRouter);

// ## Notifications
router.use('/notifications', operatorNotificationsRouter );

// ## Readings
router.use('/reading', readingsRouter);
router.use('/maintenance-plan', maintenancePlanRouter);

// ## Template Work Orders
router.use('/template-wo', templateWORouter);

// ## Shared
router.use('/shared', sharedRouter);
router.use('/category', categoryRouter);

//Statics
router.use('/src/assets', express.static('src/assets'));

app.use('/api',router);
// Exports
export default app;

// process.on('uncaughtException', (err:any) => {
//   console.error(`Uncaught Exception: ${err.message}`)
//   // process.exit(1)
// })
// process.on('unhandledRejection', (reason:any, promise:any) => {
//   console.log('Unhandled rejection at ', promise, `reason: ${reason}`)
//   // process.exit(1)
// })
