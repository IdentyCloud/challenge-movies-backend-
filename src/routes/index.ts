import express from 'express';
import authentication from '@routes/authentication';
import movies from '@routes/movies';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    movies(router);

    return router;
}
