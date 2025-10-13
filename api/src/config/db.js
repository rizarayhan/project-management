import mongose from "mongoose";

const connectionDB = async () => {
  try {
    const conn = await mongose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connectedd ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectionDB;
