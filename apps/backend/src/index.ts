import express from "express";
import cors from "cors";
import { directoryRoutes } from "./routes/directoryRoutes";

const app = express();
const frontendOrigin = "http://localhost:5173";

app.use((req, res, next) => {
  const origin = req.get("Origin");

  if (origin && origin !== frontendOrigin) {
    res.status(403).json({ message: "Origin is not allowed." });
    return;
  }

  next();
});

app.use(cors({ origin: frontendOrigin }));
app.use(express.json());
app.use("/api", directoryRoutes);

app.listen(3001, "127.0.0.1", () => {
  console.log("API running at http://127.0.0.1:3001");
});
