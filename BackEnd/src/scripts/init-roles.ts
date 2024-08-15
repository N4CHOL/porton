import { Role } from '../app/user/models/role.model';
import * as rolesService from '../app/user/services/role.service';
import { ROLES } from '../environments/constants';

export const initRoles = async () => {

    const roles: string[] = Object.values(ROLES);
    const rolesP: Promise<Role | null>[] = roles.map<Promise<Role | null>>(async (val: string) => {
        const rolesN: number = await Role.count({ where: { name: val } });
        if (rolesN > 0) return null;
        return rolesService.saveRole({ name: val });
    })
    return Promise.all(rolesP);
}

