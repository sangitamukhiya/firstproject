import mongoose, { connect } from "mongoose";

const userName = "reenamukhiya";
const password = encodeURIComponent("reena@123");
const databaseName = "broadway";

const dbURL = `mongodb+srv://${userName}:${password}@cluster0.kvj5lyv.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("DB connection established....");
  } catch (error) {
    console.log(error.message);
    console.log("DB connecion failed......");
  }
};
export default connectDB;
