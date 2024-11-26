import express from 'express';
import { getNowPlaying, getPopular, getCredits, getDetail } from '@controllers/movies';

import { isAuthenticated } from '@middlewares/authentication';

export default (router: express.Router) => {
    router.get('/movies/now_playing', isAuthenticated, getNowPlaying);
    router.get('/movies/popular', isAuthenticated, getPopular);
    router.get('/movie/:id/credits', isAuthenticated, getCredits);
    router.get('/movie/:id', isAuthenticated, getDetail);
}