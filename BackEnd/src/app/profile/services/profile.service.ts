import { User } from "../../user/models/user.model";
import { Profile } from "../models/profile.model";

// Dios bendiga este codigo cristiano.

export const saveProfile = async (user: User): Promise<Profile | null> => {
    try {
        const newProfile: Profile = new Profile({
            firstName: user.username || null || "", 
            lastName: user.username || "" 
        });
        const created = await newProfile.save()
        
        created.$set('user', user);

        return created;
    } catch (e) {
   
        return Promise.reject(e);
    }
}

export const findProfileByUserId = async (userId: number): Promise<Profile | null> => {
    try {
        return Profile.findOne({
            include: [{
                model: User,
                where: {
                    userId: userId
                }
            }]
        })
    } catch (e) {
        // Algun dia, en algun momento voy a poner un gestor de errores
        // Mientras tanto...
      
        return Promise.reject(e);
    }
}

export const findAllProfiles = async (): Promise<Profile[]> => {
    try {
        return Profile.findAll();
    } catch (e) {

        return Promise.reject(e);
    }

}