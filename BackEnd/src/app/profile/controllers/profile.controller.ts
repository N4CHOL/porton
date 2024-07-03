import { Request, Response } from 'express';
import { Profile } from '../models/profile.model';
import * as profileService from '../services/profile.service';

export const getProfiles = (req: Request, res: Response) => {

    try {
        profileService.findAllProfiles().then((profiles: Profile[]) => {
            return res.status(200).send(profiles);
        });
    } catch (e) {
     
        return res.status(500).send(e);
    }
}
