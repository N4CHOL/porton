import * as componentService from '../../app/assets/services/component.service';
import { Composite } from '../../app/assets/models/composite.model';
import { PhysicalComponent } from '../../app/assets/models/physical-component.model';
import * as physicalCompService from '../../app/assets/services/physical-component.service';

export const initRequiredPComponentOnComponent = async () => {
  await physicalCompService.findOrCreateEmptyPC();

  const components: Composite[] = await componentService.getAllComponents();
  components.forEach(async (value: Composite) => {
    if (!value.physicalComponent) {
      const pcSaved = await physicalCompService.findOrCreateEmptyPC();
      await value.$set('physicalComponent', pcSaved);
    }
  });
};
