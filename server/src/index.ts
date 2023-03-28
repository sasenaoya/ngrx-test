import express, { NextFunction, Request, Response } from 'express';
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

// router
const router = express.Router();

// log
router.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}]`, req.method, req.url);
    next();
});

app.use(express.static('dist'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`ngrx-test app listening on port ${port}`);
});
