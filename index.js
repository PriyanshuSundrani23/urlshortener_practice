import express from 'express'
import 'dotenv/config'

import userRouter from './router/user.routes.js'

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());

app.use('/user', userRouter);

app.listen(PORT, () =>{
    console.log(`server is running on PORT ${PORT}`);
});

app.get('/', (req, res) =>{
    return res.json({status: 'Server is up and running...'});
});
