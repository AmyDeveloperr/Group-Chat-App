const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const cors = require('cors');
const { serialize } = require('v8');
const userRoutes = require('./routes/user');

const app = express();

app.use(express.json());
app.use(cors({
    origin:'*',
    credentials:true
}));

app.use('/user',userRoutes);

sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
