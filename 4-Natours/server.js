const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
// eslint-disable-next-line import/newline-after-import

const app = require('./app');

const port = process.env.PORT;

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
  console.log('Database connection successfull! ');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
