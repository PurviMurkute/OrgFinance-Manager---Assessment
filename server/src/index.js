import express from "express";
import dotenv from "dotenv";
import job from "./config/cron.js";
dotenv.config();
import connDB from "./config/dbConnect.js";
import authRouter from "./routes/authRoutes.js";
import recordRouter from "./routes/recordRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";
import userRouter from "./routes/userRoutes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

connDB();
const app = express();

app.use(express.json());

job.start();

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

app.use("/api/v1", authRouter);
app.use("/api/v1", recordRouter);
app.use("/api/v1", dashboardRouter);
app.use("/api/v1", userRouter);
// expose raw OpenAPI JSON so it can be downloaded/shared easily
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json(swaggerSpec);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
