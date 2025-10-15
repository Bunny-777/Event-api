
import express from "express";
import prisma from "./db.js"; 

const app = express();
const PORT = 3000;

app.use(express.json());

// Test route
app.get("/", async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            email: "kushara@gmail.com"
        }
    })
    console.log(user);
    res.json({user});
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
