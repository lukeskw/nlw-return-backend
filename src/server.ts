import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(express.json());
app.use(routes);

// app.get('/users', (req, res)=>{
//   res.send('olá mundo!');
// })


app.listen(process.env.PORT || 3333, ()=>{
  console.log("Express server is running!");
})