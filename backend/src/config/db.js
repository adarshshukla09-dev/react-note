import mongoose from "mongoose";
export const connectDB = () => {
  main()
    .then(console.log("connected to mongo db "))
    .catch((err) => console.log(err));

  async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
  }
};
