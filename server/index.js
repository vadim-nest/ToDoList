const express = require('express');
const router = require('./router');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server error');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
