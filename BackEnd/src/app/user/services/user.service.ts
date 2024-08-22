import { AutoIncrement } from 'sequelize-typescript';
import { IUser, User } from '../models/user.model';
import * as profileService from '../../profile/services/profile.service';
import { IRole, Role } from '../models/role.model';
import { Profile } from '../../profile/models/profile.model';
import { Access } from '../models/access.model';
import { Action } from '../models/action.model';


export const editUser = async (id: number, modUser: IUser): Promise<User | null> => {
    modUser.username = modUser.username.toLowerCase();
    let user: User | null = await User.findByPk(id);

    if (user) {
        if (!modUser.password) modUser.password = user.password
        user = Object.assign(user, modUser);
        //Verificar roles que vienen del Frontend
        if (!modUser.roles) return null;
        // Buscarlos en BD
        const roles: Promise<Role | null>[] = [];
        modUser.roles?.forEach(async (role: IRole) => {
            if (!role.roleId) return null;
            roles.push(Role.findByPk(role.roleId));
        })
        // Crear array de roles
        await Promise.all(roles).then((val: (Role | null)[]) => {
            const rolesFound: Role[] = val.filter<Role>((rol: Role | null): rol is Role => {
                return rol !== null;
            })
            if (user) user.$set<Role>('roles', rolesFound);
        })
        // Setearlos al usuario
        return user.save();
    }

    return null;
}

export const saveUser = async (user: IUser, visible: boolean = true) => {
    const newUser: User = new User({ ...user });
    newUser.visible = visible;
    newUser.username = newUser.username.toLowerCase();

    try {
        const sUser: User = await newUser.save();
        const roles: Promise<Role | null>[] = [];
        user.roles?.forEach(async (role: IRole) => {
            if (!role.roleId) return null;
            roles.push(Role.findByPk(role.roleId));

        })
        Promise.all(roles).then((val: (Role | null)[]) => {
            val.forEach((role: Role | null) => {
                if (role) {
                    sUser.$add<Role>('roles', role);
                }
            })
        })

        profileService.saveProfile(sUser)

        return sUser;

    } catch (error) {
        return Promise.reject(error);
    }


}

export const getUser = async (id: number): Promise<User | null> => {
    return User.scope('basic').findByPk(id);
}

export const getUsers = async (): Promise<User[]> => {
    return User.findAll();
}

export const getOperators = async (): Promise<User[]> => {
    return User.scope('only-operators').findAll();
}

export const findUserByUsername = async (username: string, scope?: string): Promise<User | null> => {
    const sc: string = scope ? scope : 'basic';
    return User.scope(sc).findOne({
        attributes: [
            'userId',
            'username',
            'name',
            'lastName',
            'phone',
            'cargo',
            'activated',
            'email',
            'codeArea',
            'password'],
        where: {
            username: username
        }
    });
    // SELECT User.userid, User.username FROM User Where username= $1;
}

export const userHasAccessToFeature = async (username: string, feature: string, actions: string[]): Promise<boolean> => {
    try {
        const user = await findUserByUsername(username, 'all');
        if (!user) throw 'No existe el usuario'
        return user.roles.some((role: Role) => {
            return role.accesses.some((access: Access) => {
                return access.feature.name === feature && access.actions.filter((action: Action) => {
                    return actions.includes(action.name);
                }).length > 0
            })
        })
    } catch (e) {
        return Promise.reject(e);
    }
}