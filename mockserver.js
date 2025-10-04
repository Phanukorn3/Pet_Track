import express from "express";
const app = express();
app.use(express.json());

// Mock Signup endpoint
app.post("/signup", (req, res) => {
  console.log("Received signup:", req.body);
  res.json({ message: "Mock signup successful", data: req.body });
});

// Mock Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("Received login:", req.body);

  // ตัวอย่างเช็คแบบ mock
  if (username === "toto@example.com" && password === "123456") {
    res.json({ message: "Login successful", token: "mock-jwt-token" });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

app.listen(3000, () => console.log("Mock server running on http://localhost:3000"));