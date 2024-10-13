import { app } from "./api";
import { DBHandler } from "./db";
import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
const mongoUrl = process.env.MONGODB_URL;
try {
    DBHandler.getInstance();
    console.log(`Connected to MongoDB at ${mongoUrl}`);
} catch (err) {
    console.error(`Failed to connect to MongoDB at ${mongoUrl}: ${err}`);
    process.exit(1);
}

// Start the app server
const port = process.env.PORT;
try {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
} catch (err) {
    console.error(
        `Failed to start server on port http://localhost:${port} : ${err}`
    );
    process.exit(1);
}
