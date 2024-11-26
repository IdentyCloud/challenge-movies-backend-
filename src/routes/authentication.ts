import express from 'express';
import { login, register, session } from '@controllers/authentication';

export default (router: express.Router) => {
    router.post('/auth/login', login);
    router.post('/auth/register', register);
    router.get('/auth/session', session);
}