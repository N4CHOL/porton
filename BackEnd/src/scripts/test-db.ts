import { User } from '../app/user/models/user.model';
import * as UserService from '../app/user/services/user.service';
import * as roleService from '../app/user/services/role.service'
import { ROLES } from '../environments/constants';
import { Role } from '../app/user/models/role.model';

export const defineAdminUser = async () => {
    try {
        const countAdmin: number = await User.scope('all-left').count({ where: { username: 'admin' } });
        if (countAdmin < 1) {


            const roleAdmin: Role | null = await roleService.findRole(ROLES.ADMINISTRADOR);
            if (!roleAdmin) throw 'No hay rol admin';
            await UserService.saveUser({
                username: 'admin',
                name: 'admin',
                password: 'OnSunTesla21!',
                activated: true,
                email: 'ppolo@factoris.co',
                roles: [roleAdmin],
                lastName: "Lastname",
                cargo: "Cargo",
                codeArea: "12314",
                phone: "1234567890"
            },
                false)
                .then(
                    (user: User) => {
                 
                    }
                ), (error: any) => {
                 
                }
       
        } else {
           
            const adminUser: User | null = await User.scope('all-left').findOne({ where: { username: 'admin' } });
            if (!adminUser) throw 'No se encontro el usuario administrador';
            if (!adminUser?.roles.some((role: Role) => {
                return role.name === ROLES.ADMINISTRADOR
            })) {
             
                const roleAdmin: Role | null = await roleService.findRole(ROLES.ADMINISTRADOR);
                if (!roleAdmin) throw 'No hay rol admin';
                await adminUser.$set<Role>('roles', [roleAdmin]);
              
            }
        }
    } catch (e) {
      
    }
}