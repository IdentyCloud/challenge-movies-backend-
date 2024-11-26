import 'dotenv/config';
import "@config/mongo";

import cors from "cors";
import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from 'morgan';

import routes from '@routes/index';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors(
    {
        origin: ['http://localhost:4200'],
        credentials: true
    }
))

app.use(compression())
app.use(cookieParser())
app.use(express.json())
app.use(morgan('dev'))

app.use(express.static("public"));

app.use("/v1", routes())

app.listen(port, () => {
    console.log(`server: ${port}`);
})