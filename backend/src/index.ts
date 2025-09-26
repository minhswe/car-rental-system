import express, { Request, Response } from "express";
import cors from "cors";
import { ENV } from "@/common/configs/environment.config";
import connectDB from "@/common/configs/database.config";
import router from "@/routes/index";
import notFoundMiddleware from "@/common/middlewares/not-found.middleware";
import { errorHandler } from "@/common/middlewares/error-handler.middleware";
import path from "path";
const app = express();
const PORT = ENV.PORT;

connectDB();

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript!");
});

app.use(errorHandler);

app.use(notFoundMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
