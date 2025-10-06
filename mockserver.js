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

let pets = [
  { id: 1, name: "Milo", image: "https://placekitten.com/200/200" },
  { id: 2, name: "Luna", image: "https://placekitten.com/201/201" },
  { id: 3, name: "Bobby", image: "https://placekitten.com/202/202" },
];

// Get all pets
app.get("/pets", (req, res) => {
  res.json(pets);
});

// Add new pet
app.post("/pets", (req, res) => {
  const { name, image } = req.body;
  const newPet = { id: pets.length + 1, name, image };
  pets.push(newPet);
  console.log("Added pet:", newPet);
  res.json(newPet);
});

// -----------------------------
// Mock Profile endpoint
const userProfile = {
  username: "Bibi",
  profileImageUrl: "https://i.pravatar.cc/100",
};

app.get("/profile", (req, res) => {
  res.json(userProfile);
});

// -----------------------------
app.listen(3000, () =>
  console.log("Mock server running on http://localhost:3000")
);