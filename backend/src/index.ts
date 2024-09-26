import { api } from "./api";
import { apiPort as port, mongodbUrl } from "./config.json";
import { DBHandler } from "./db";

// The server will be hosted under the /api uri
// "/" is for the vue app

// Connect to MongoDB
try {
    DBHandler.getInstance();
    console.log(`Connected to MongoDB at ${mongodbUrl}`);
} catch (err) {
    console.error(`Failed to connect to MongoDB at ${mongodbUrl}: ${err}`);
    process.exit(1);
}

// Start the api server
try {
    api.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
} catch (err) {
    console.error(
        `Failed to start server on port http://localhost:${port} : ${err}`
    );
    process.exit(1);
}
