import express from "express";
import multer from "multer";
import path from "path";
import cors from "cors";
import fs from "fs";

// ตรวจสอบและสร้างโฟลเดอร์ uploads ถ้าไม่มี
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const app = express();
app.use(express.json());
app.use(cors());

// ตั้ง storage สำหรับ multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // โฟลเดอร์เก็บไฟล์
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  },
});

app.delete("/pets/:id", (req, res) => {
  const { id } = req.params;
  const petIndex = pets.findIndex((p) => p.id === parseInt(id));
  if (petIndex === -1) return res.status(404).json({ message: "Pet not found" });

  const removedPet = pets.splice(petIndex, 1)[0];
  console.log("Deleted pet:", removedPet);
  res.json({ message: "Pet deleted", pet: removedPet });
});

const upload = multer({ storage });

// Mock Signup endpoint
app.post("/signup", (req, res) => {
  console.log("Received signup:", req.body);
  res.json({ message: "Mock signup successful", data: req.body });
});

// Mock Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("Received login:", req.body);
  if (username === "toto@example.com" && password === "123456") {
    res.json({ message: "Login successful", token: "mock-jwt-token" });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// เก็บ pets ใน memory
let pets = [
  { id: 1, name: "Milo", image: "https://placekitten.com/200/200" },
  { id: 2, name: "Luna", image: "https://placekitten.com/201/201" },
  { id: 3, name: "Bobby", image: "https://placekitten.com/202/202" },
];

// GET all pets
app.get("/pets", (req, res) => {
  res.json(pets);
});

// POST new pet (รองรับ file upload)
app.post("/pets", upload.single("image"), (req, res) => {
  const { name, age, sex, weight, type,description } = req.body;
  const file = req.file;

  if (!name || !file) {
    return res.status(400).json({ message: "Name and image are required" });
  }

  const newPet = {
    id: pets.length + 1,
    name,
    age,
    sex,
    weight,
    type,
    description,
    image: `http://localhost:3000/uploads/${file.filename}`,
  };

  pets.push(newPet);
  console.log("Added pet:", newPet);
  res.json(newPet);
});

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// Mock Profile endpoint
const userProfile = {
  username: "Bibi",
  profileImageUrl: "https://i.pravatar.cc/100",
};

app.get("/profile", (req, res) => {
  res.json(userProfile);
});

app.listen(3000, () =>
  console.log("Mock server running on http://localhost:3000")
);
