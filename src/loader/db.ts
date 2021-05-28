import mongoose from 'mongoose';

export const connectDB = () => {
  const DB_URL = String(process.env.DB_URL);

  const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  };

  mongoose
    .connect(DB_URL, options)
    .then(() => {
      console.log('connected mongo');
    })
    .catch((err) => {
      console.error(err);
    });
};

mongoose.connection.on('error', (err) => {
  console.log('error in connecting mongodb' + err);
});

mongoose.connection.on('disconnected', () => {
  setTimeout(connectDB, 5000);
});
