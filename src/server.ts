import "dotenv/config";
import env from "./util/validateEnv";
import mongoose from "mongoose";
import app from "./app";


const connect = async () => {
  try {
    await mongoose.connect(env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
    throw error;
  }
};



const PORT = env.PORT || 5000;
app.listen(PORT, () => {
  connect();
  console.log(`Server running on port ${PORT}`);
});