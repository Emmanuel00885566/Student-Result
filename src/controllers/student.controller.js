import db from "../../models/index.js";

export const createStudent = async (req, res) => {
  try {
    const { firstName, lastName, otherName, regNumber, gender, dateOfBirth, classId } = req.body;

    if (!firstName || !lastName || !regNumber || !gender || !dateOfBirth) {
      return res.status(400).json({
        message: "firstName, lastName, regNumber, gender, and dateOfBirth are required",
      });
    }

    const existing = await db.Student.findOne({ where: { regNumber } });
    if (existing) {
      return res.status(409).json({ message: "A student with this regNumber already exists" });
    }

    if (classId) {
      const classItem = await db.Class.findByPk(classId);
      if (!classItem) {
        return res.status(404).json({ message: "Class not found" });
      }
    }

    const student = await db.Student.create({
      firstName,
      lastName,
      otherName,
      regNumber,
      gender,
      dateOfBirth,
      classId: classId || null,
    });

    return res.status(201).json({ message: "Student registered", student });
  } catch (error) {
    console.error("Create student error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getStudents = async (req, res) => {
  try {
    const { classId } = req.query;
    const where = classId ? { classId } : {};

    const students = await db.Student.findAll({
      where,
      include: [{ model: db.Class, as: "class", attributes: ["name", "level"] }],
      order: [["firstName", "ASC"]],
    });

    return res.status(200).json({ students });
  } catch (error) {
    console.error("Get students error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await db.Student.findByPk(id, {
      include: [{ model: db.Class, as: "class", attributes: ["name", "level"] }],
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({ student });
  } catch (error) {
    console.error("Get student error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, otherName, classId, isActive } = req.body;

    const student = await db.Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (classId) {
      const classItem = await db.Class.findByPk(classId);
      if (!classItem) {
        return res.status(404).json({ message: "Class not found" });
      }
    }

    await student.update({ firstName, lastName, otherName, classId, isActive });

    return res.status(200).json({ message: "Student updated", student });
  } catch (error) {
    console.error("Update student error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await db.Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await student.destroy();

    return res.status(200).json({ message: "Student deleted" });
  } catch (error) {
    console.error("Delete student error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};