import { Router } from 'express';
import * as readingsController from './controllers/readings.controller';

const router = Router();

router.post('/', [], readingsController.postReading);
router.get('/:tag', [], readingsController.getReadingsByTag);
router.get('/summary/:tag', [], readingsController.getReadingsSummaryByTag);
router.get('/averages/:tag', [], readingsController.getReadingsAveragesByTag);

export default router;