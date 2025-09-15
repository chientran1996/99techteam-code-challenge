import express from "express";
import cors from "cors";
import { PORT } from "./config";
import { connectDB } from "./db";
import resourceRoutes from "./routes/resourceRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/resources", resourceRoutes);

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});