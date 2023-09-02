import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import EmployeeRoute from "./routes/EmployeeRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(EmployeeRoute);

app.listen(5000, () => console.log("Server up dan running..."));
