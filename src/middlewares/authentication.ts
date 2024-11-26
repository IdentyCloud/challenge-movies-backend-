import express from 'express';
import { UserModel } from '@models/user';

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['sessionToken'];

        if (!sessionToken) {
            res.sendStatus(401);
            return;
        }

        const user = await UserModel.findOne({ 'authentication.sessionToken': sessionToken }).select('+authentication.sessionToken');

        if (!user) {
            res.sendStatus(401);
            return;
        }

        req.user = user;

        next();
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
};