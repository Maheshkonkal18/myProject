import express from "express";
import fs from "fs/promises";
import path from "path";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import { studentOnly, authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const studentsPath = path.join(__dirname, "..", "students.json");

const readStudents = async () => {
  const data = await fs.readFile(studentsPath, "utf-8");
  return JSON.parse(data);
};

const writeStudents = async (students) => {
  await fs.writeFile(studentsPath, JSON.stringify(students, null, 2));
};

router.post("/login", async (req, res) => {
  const { admin, username, password, name, usn } = req.body;

  try {
    // Admin login
    if (admin) {
      if (
        username === process.env.ADMIN_USER &&
        password === process.env.ADMIN_PASS
      ) {
        const token = jwt.sign(
          { role: "admin", username },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        return res.json({ token, role: "admin" });
      }
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    // Student login
    if (!name || !usn || !password) {
      return res
        .status(400)
        .json({ message: "Name, USN and password are required" });
    }

    const students = await readStudents();
    const student = students.find(
      (s) =>
        s.name.trim().toLowerCase() === name.trim().toLowerCase() &&
        s.usn.trim().toLowerCase() === usn.trim().toLowerCase()
    );

    if (!student) {
      return res.status(401).json({ message: "Student not found" });
    }

    const defaultPass = process.env.STUDENT_PASS;
    const storedPassword = student.password || "";

    const isPasswordValid =
      (storedPassword === "" && password === defaultPass) ||
      storedPassword === password;

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { role: "student", name: student.name, usn: student.usn },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.json({
      token,
      role: "student",
      name: student.name,
      usn: student.usn
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/change-password", authMiddleware, studentOnly, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Current and new password are required" });
  }

  try {
    const students = await readStudents();
    const studentIndex = students.findIndex(
      (s) =>
        s.usn.trim().toLowerCase() === req.user.usn.trim().toLowerCase() &&
        s.name.trim().toLowerCase() === req.user.name.trim().toLowerCase()
    );

    if (studentIndex === -1) {
      return res.status(404).json({ message: "Student not found" });
    }

    const student = students[studentIndex];
    const defaultPass = process.env.STUDENT_PASS;
    const storedPassword = student.password || "";

    const isPasswordValid =
      (storedPassword === "" && currentPassword === defaultPass) ||
      storedPassword === currentPassword;

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    student.password = newPassword;
    students[studentIndex] = student;
    await writeStudents(students);

    return res.json({
      message: "Password updated successfully. Please login again."
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
