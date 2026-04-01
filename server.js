const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 4105;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "assignment3_app5"
});

app.get("/restaurants", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, name, cuisine, rating FROM restaurants ORDER BY rating DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`App 5 server running on http://localhost:${PORT}`);
});
