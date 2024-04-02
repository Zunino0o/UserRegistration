import express from 'express';
import ip from 'ip';
import cors from 'cors';
import dotenv from 'dotenv';
import Response from './domain/response.js';
import HttpStatus from './utils/httpStatus.js';
import logger from './utils/logger.js';
import patientRoutes from './routes/patient.route.js';
import loginRoutes from './routes/login.route.js';

dotenv.config();
const PORT = process.env.SERVER_PORT || 8080;
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/login', loginRoutes);
app.use('/patients', patientRoutes);

app.get('/', (req, res) => {
  res.send(
    new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Server is running')
  );
});

app.all('*', (req, res) => {
  res
    .status(HttpStatus.NOT_FOUND.code)
    .send(
      new Response(
        HttpStatus.NOT_FOUND.code,
        HttpStatus.NOT_FOUND.status,
        'Route does not exists'
      )
    );
});

app.listen(PORT, () => {
  logger.info(`Server running on http://${ip.address()}:${PORT}`);
});
