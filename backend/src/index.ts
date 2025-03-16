import dotenv from "dotenv";
import { app } from "./api";
import { DBHandler } from "./db";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const enableLogin = process.env.ENABLE_LOGIN === "true";

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

if (enableLogin) {
    console.log("Login functionality is enabled.");
} else {
    console.log("Login functionality is disabled.");
}
