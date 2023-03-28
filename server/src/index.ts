import express, { NextFunction, Request, Response } from 'express';
const app = express();

import fileUpload from 'express-fileupload';
const temp_dir = process.env.TEMP_DIR || '/home/node/tmp/';
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : temp_dir,
    defCharset: 'utf8',
    defParamCharset: 'utf8',
}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// mongo
import * as mongo from './mongo';
mongo.connect();

// router
const router = express.Router();

// log
router.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}]`, req.method, req.url);
    next();
});

// api
import { router as apiRouter } from './api-routes';
router.use('/api', apiRouter);
app.use(router);

app.use(express.static('dist'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`ngrx-test app listening on port ${port}`);
});
