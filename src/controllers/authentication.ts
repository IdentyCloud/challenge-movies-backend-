import express from 'express';

import { UserModel } from '@models/user';
import { IUser } from '@interfaces/user';

import { random } from '@helpers/random';
import { authentication } from '@helpers/authentication';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required.' });
            return;
        }

        const user = await UserModel.findOne({ email }).select('+authentication.salt +authentication.password');

        if (!user) {
            res.status(401).json({ error: 'Invalid email or password.' });
            return;
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if (expectedHash !== user.authentication.password) {
            res.status(401).json({ error: 'Invalid email or password.' });
            return;
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('sessionToken', user.authentication.sessionToken, {
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        });

        res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            birthdate: user.birthdate,
            sessionToken: user.authentication.sessionToken,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'An error occurred while logging in.' });
    }
}

export const session = async (req: express.Request, res: express.Response) => {
    try {
        const { sessionToken } = req.cookies;

        if (!sessionToken) {
            res.status(200).json({ authenticated: false });
            return;
        }

        const user = await UserModel.findOne({ 'authentication.sessionToken': sessionToken });

        if (!user) {
            res.status(200).json({ authenticated: false });
            return;
        }

        res.status(200).json({ authenticated: true });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'An error occurred while checking the session.' });
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, firstName, lastName, birthdate } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required.' });
            return;
        }

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            res.status(409).json({ error: 'Email already in use.' });
            return;
        }

        const salt = random();
        const user = await new UserModel<IUser>({
            firstName,
            lastName,
            email,
            birthdate,
            authentication: {
                password: authentication(salt, password),
                salt,
            }
        }).save().then((user) => user.toObject());

        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'An error occurred while registering.' });
    }
}