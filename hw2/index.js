const express = require("express");
const mysql = require("mysql2");
const { body, validationResult } = require("express-validator");

const app = express();
app.use(express.json());

app.get("/healthcheck", (req, res) => {
  res.send("OK");
});

const db = mysql.createConnection({
  host: "appwork-hw1-db.cakf0xkpyic8.ap-southeast-2.rds.amazonaws.com",
  user: "admin",
  password: "12345678",
  database: "assignment",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

app.post(
  "/users",
  [
    body("name")
      .isAlphanumeric()
      .withMessage("Name can only contain letters and numbers"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
      .withMessage(
        "Password should contain at least three of the four character types: Uppercase letters, Lowercase letters, Numbers, Symbols"
      ),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { name, email, password } = req.body;
    const query = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
    db.query(query, [name, email, password], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ error: "Email already exists" });
        }
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.status(200).json({
        data: {
          user: {
            id: result.insertId,
            name: name,
            email: email,
          },
          "request-date": req.get("Request-Date"),
        },
      });
    });
  }
);

app.get("/users", (req, res) => {
  const userId = req.query.id;

  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user id format" });
  }

  const query = "SELECT id, name, email FROM user WHERE id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(403).json({ error: "User not found" });
    }

    res.status(200).json({
      data: {
        user: results[0],
        "request-date": req.get("Request-Date"),
      },
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
