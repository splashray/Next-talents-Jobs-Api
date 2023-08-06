const mongoose = require('mongoose');
//..................using atlas
const localDB = "mongodb://localhost:27017/tryingPagenation";

const connectDB = async () => {
  await mongoose
    .connect(localDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("mongoDB connected successfully!"))
    .catch((err) => console.error("Could not connect to mongoDB", err));
};

// ...........................................
// const connectDB = (url) => {
//   return mongoose.connect(url, {
//     useNewUrlParser: true,
//     // useCreateIndex: true,
//     // useFindAndModify: false,
//     useUnifiedTopology: true,
//   })
// }

module.exports = connectDB;
