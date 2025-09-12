import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/db/index.js";

dotenv.config({ path: "./.env" });

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION!, shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () =>
      console.log(`Server is running on port: ${PORT}`)
    );

    process.on("unhandledRejection", (err) => {
      console.error("UNHANDLED REJECTION!, shutting down...");
      console.log(err.name, err.message);
      server.close(() => process.exit(1));
    });
  } catch (err) {
    console.error("DB connection failed", err);
    process.exit(1);
  }
};

startServer();
