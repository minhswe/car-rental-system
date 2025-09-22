import express, { Request, Response } from "express";
import cors from "cors";
import { ENV } from "@/common/configs/environment.config";
import connectDB from "@/common/configs/database.config";
import router from "@/routes/index";
import notFoundMiddleware from "@/common/middlewares/not-found.middleware";
import { errorHandler } from "@/common/middlewares/error-handler.middleware";
const app = express();
const PORT = ENV.PORT;

app.use(cors());

connectDB();
app.use(express.json(), express.urlencoded({ extended: true }));
app.use("/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript!");
});

app.use(errorHandler);
app.use(notFoundMiddleware);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
