import express, { Express, Request, Response } from "express";
import { connect } from "./db";
import { config } from "./config";
import apartmentsRouter from "./controllers/apartments.controller";
import cors from "cors";

connect();

const app: Express = express();

app.use(cors<Request>());

app.get("/", (req: Request, res: Response) => {
  res.send("HeathCheck");
});

app.use("/apartments", apartmentsRouter);

app.listen(config.port, () => {
  console.log(`[server]: Server is running at http://localhost:${config.port}`);
});
