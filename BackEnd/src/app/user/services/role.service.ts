import { Access } from '../models/access.model';
import { Feature } from '../models/feature.model';
import { RoleAccess } from '../models/role-access.model';
import { IRole, Role } from '../models/role.model';

export const getRoles = async (): Promise<Role[]> => {

    return Role.findAll();
}

export const saveRole = async (role: IRole): Promise<Role> => {
    const newRole: Role = new Role({...role});
    return newRole.save();
}

export const findRole = async (roleName: string): Promise<Role | null> => {
    return Role.findOne({ where: { name: roleName } });
}

export const roleHasAccessToFeature = async (roleName: string, featureName: string): Promise<boolean> => {
    //BRUH
    return await Role.count({
        where: {
            name: roleName
        },
        include: [{
            model: Access,
            required: true,
            include: [
                {
                    model: Feature,
                    required: true,
                    where: {
                        name: featureName
                    }
                }
            ]
        }]
    }) > 0;

}