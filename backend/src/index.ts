import express, { Request, Response } from "express";
import { ENV } from "common/configs/environment.config";
import connectDB from "common/configs/database.config";
import router from "./routes/index";
import notFoundMiddleware from "common/middlewares/not-found.middleware";

const app = express();
const PORT = ENV.PORT;

connectDB();

app.use("/", router);
app.use(notFoundMiddleware);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
