import express from 'express';
import bodyParser from 'body-parser';
import './config/db.js'

//Routes
import authRouter from './routes/authRoutes.js'
import taskRouter from './routes/taskRoutes.js'

//DOCS
import  swaggerUI  from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

const app = express();

//middleware

app.use(bodyParser.json());

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/api', authRouter);
app.use('/api', taskRouter);

const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
});