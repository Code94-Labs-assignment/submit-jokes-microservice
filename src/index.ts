import express from "express";
import logger from "./utils/logger";
import { connect } from "./database/database";
import cors from "cors";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./utils/swaggerConfig";
import jokeRouter from "./routes/joke.routes"; // Import your joke routes
import { baseUrl } from "./configs/config";
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*", // Allow all origins. You can restrict this to specific domains.
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  }),
);

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/jokes", jokeRouter); // Use the joke routes

const PORT = process.env.PORT || "9091";

app.listen(PORT, () => {
  connect(); // Connect to the database
  logger.info(`Server is running on ${process.env.NEXT_PUBLIC_SUBMIT_SERVICE}`);
  logger.info(
    `Swagger docs are available at ${process.env.NEXT_PUBLIC_SUBMIT_SERVICE}/api-docs`,
  );
});
