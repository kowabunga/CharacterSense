const mongoose = require('mongoose');

module.exports = connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`MongoDb connected on ${connection.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
