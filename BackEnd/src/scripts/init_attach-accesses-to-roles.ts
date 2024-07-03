import * as rolesService from '../app/user/services/role.service';
import * as accessService from '../app/user/services/access.service';
import { ACTIONS, FEATURES, ROLES } from '../environments/constants';
import { Role } from '../app/user/models/role.model';
import { Access } from '../app/user/models/access.model';

export const initBasicAccessesToRoles = async () => {
  const admin: Role | null = await rolesService.findRole(ROLES.ADMINISTRADOR);
  if (!admin) throw `No se encontro rol ${ROLES.ADMINISTRADOR}`;
  Object.values(FEATURES).forEach(async (value: FEATURES) => {
    const exists: boolean = await rolesService.roleHasAccessToFeature(
      admin.name,
      value
    );
    if (!exists) {
      let acc: Access = await accessService.createAccess(value, [ACTIONS.ALL]);
      await admin.$add<Access>('accesses', acc);
    } else {
  
    }
  });

  const encargado: Role | null = await rolesService.findRole(ROLES.ENCARGADO);
  if (!encargado) throw `No se encontró rol ${ROLES.ENCARGADO}`;

  const encFeatures: string[] = Object.values(FEATURES).filter(
    (val: FEATURES) => {
      return !(val == FEATURES.ACTIVITY );
    }
  );

  encFeatures.forEach(async (value: string) => {
    const exists: boolean = await rolesService.roleHasAccessToFeature(
      encargado.name,
      value
    );
    if (!exists) {
      let acc: Access = await accessService.createAccess(value, [
        ACTIONS.CREATE,
        ACTIONS.CANCEL,
        ACTIONS.EDIT,
        ACTIONS.LIST,
        ACTIONS.VIEW_ONE,
        ACTIONS.SEND,
        ACTIONS.DELETE,
      ]);
      await encargado.$add<Access>('accesses', acc);
    } else {
  
    }
  });

  const encFeatUsers: string[] = [FEATURES.USER, FEATURES.ROLE];
  encFeatUsers.forEach(async (value: string) => {
    const exists: boolean = await rolesService.roleHasAccessToFeature(
      encargado.name,
      value
    );
    if (!exists) {
      let acc: Access = await accessService.createAccess(value, [
        ACTIONS.LIST,
        ACTIONS.VIEW_ONE,
      ]);
      await encargado.$add<Access>('accesses', acc);
    } else {

    }
  });

  const operario: Role | null = await rolesService.findRole(ROLES.OPERARIO);
if (!operario) throw `No se encontró el rol ${ROLES.OPERARIO}`;

let opFeatures: string[] = [
  FEATURES.ACTIVITY,
  FEATURES.AUTH,
  FEATURES.PROFILE,
  FEATURES.OBSERVATION,
  FEATURES.ASSET, // Agregar FEATURES.ASSET
  FEATURES.COMPONENT, // Agregar FEATURES.COMPONENT
];

opFeatures.forEach(async (val: string) => {
  const exists: boolean = await rolesService.roleHasAccessToFeature(
    operario.name,
    val
  );
  
  if (!exists) {
    let acc: Access = await accessService.createAccess(val, [
      ACTIONS.VIEW_ONE,
      ACTIONS.LIST,
      ACTIONS.SEND,
    ]);
    await operario.$add<Access>('access', acc);
  } else {
    // El acceso ya existe, puedes manejarlo de otra manera si es necesario.
  }
});

};
