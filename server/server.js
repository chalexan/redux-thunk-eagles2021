const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let data = {
  counter: 22,
  user: 'Rauf',
  someDate: 'some date ... data .... ',
};

app
  .route('/api')
  .get((req, res) => {
    res.send({ data });
  })
  .post((req, res) => {
    const dbError = Math.random();
    if (dbError < 0.5) {
      data = req.body;
      console.log(data);
      return res.sendStatus(200);
    } else {
      console.log('ERROR!', data);
      return res.sendStatus(500);
    }
  });
app.listen(8080);
