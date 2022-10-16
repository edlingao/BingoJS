import express from 'express';
import path from 'path';

const { resolve } = path;
const PORT = 3000;
const app = express();
const appDir = resolve('./')

app.use(express.static('dist'))

app.get('/', (req, res) => {
  res.sendFile(`${appDir}/dist/index.html`);
})



app.listen(PORT, () => {
  console.log(`Page available on http://localhost:${PORT}`);
})
