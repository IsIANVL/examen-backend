import express from 'express';
import morgan from 'morgan';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes';

const app = express();
const PORT = 3000;

const server = http.createServer(app);

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

server.listen(PORT, () => {
  console.log(`Servidor arriba en el puerto ${PORT}`);
});

