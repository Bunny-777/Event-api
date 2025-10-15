import express from "express";
import rootRouter from "./routes/index.js"; 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Mount API version 1
app.use("/api/v1", rootRouter);

// Test root
app.get("/", (req, res) => {
  res.status(200).send("API is working fine");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
