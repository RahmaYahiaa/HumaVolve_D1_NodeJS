import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/studentsFile.json");

function getStudentsFromFile(req, res) {
  const data = fs.readFileSync(filePath, "utf-8");
  const students = JSON.parse(data);

  res.status(200).json(students);
}

function getStudentByQuery(req, res) {
  const id = parseInt(req.query.id);

  const data = fs.readFileSync(filePath, "utf-8");
  const students = JSON.parse(data);

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  res.status(200).json(student);
}

function getStudentByParam(req, res) {
  const id = parseInt(req.params.id);

  const data = fs.readFileSync(filePath, "utf-8");
  const students = JSON.parse(data);

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  res.status(200).json(student);
}

export default {
  getStudentByQuery,
  getStudentsFromFile,
  getStudentByParam,
};
