import express from 'express'
import cors from 'cors'
import "reflect-metadata";

const app = express();
const TronWeb = require('tronweb')

const PORT = 8000;
const corsOption = {
  origin: "http://localhost:3000",
  credentials: true,
}
const provider = 'https://api.shasta.trongrid.io/';

const tronWeb = new TronWeb({
  fullHost: provider,
})

app.use(cors(corsOption));


app.get('/', (req,res) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
