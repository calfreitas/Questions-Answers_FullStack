import express from "express";
import routes from "./src/routes";
import cors from "cors";

const app = express();

app.use(cors())

app.use(express.json());

app.use('/', routes);

app.listen(3002, () => console.log("Server running on port 3002"));