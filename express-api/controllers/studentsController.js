import students from "../data/students.js";
function getAllStudents(req, res) {
  res.status(200).json(students);
}

function getStudentById(req, res) {

    const id = parseInt(req.params.id);

    if (!req.params.id) {
        return res.status(400).json({
            message: "Student ID is required"
        });
    }

    const student = students.find((s) => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json(student);
}
function createStudent(req, res) {
  const { name, age } = req.body;
  const newStudent = {
    id: students.length + 1,
    name,
    age,
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
}

function updateStudent(req, res) {
  const id = parseInt(req.params.id);
  const { name, age } = req.body;
  const student = students.find((s) => s.id === id);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  student.name = name || student.name;
  student.age = age || student.age;
  res.status(200).json(student);
}

function deleteStudent(req, res) {

    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            message: "Invalid student ID"
        });
    }

    const index = students.findIndex((s) => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students.splice(index, 1);

    res.status(204).send();
}
export default {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
