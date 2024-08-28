const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
// eslint-disable-next-line import/newline-after-import

const app = require('./app');
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
const port = process.env.PORT;

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
  console.log('Database connection successfull! ');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
