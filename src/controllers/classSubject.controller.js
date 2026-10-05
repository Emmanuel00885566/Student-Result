import db from "../../models/index.js";

export const assignSubjectToClass = async (req, res) => {
  try {
    const { classId, subjectId } = req.body;

    if (!classId || !subjectId) {
      return res.status(400).json({ message: "classId and subjectId are required" });
    }

    const classItem = await db.Class.findByPk(classId);
    if (!classItem) {
      return res.status(404).json({ message: "Class not found" });
    }

    const subject = await db.Subject.findByPk(subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    const existing = await db.ClassSubject.findOne({ where: { classId, subjectId } });
    if (existing) {
      return res.status(409).json({ message: "This subject is already assigned to this class" });
    }

    const link = await db.ClassSubject.create({ classId, subjectId });

    return res.status(201).json({ message: "Subject assigned to class", link });
  } catch (error) {
    console.error("Assign subject error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getSubjectsForClass = async (req, res) => {
  try {
    const { classId } = req.params;

    const classItem = await db.Class.findByPk(classId, {
      include: [{ model: db.Subject, as: "subjects" }],
    });

    if (!classItem) {
      return res.status(404).json({ message: "Class not found" });
    }

    return res.status(200).json({ class: classItem.name, subjects: classItem.subjects });
  } catch (error) {
    console.error("Get class subjects error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const removeSubjectFromClass = async (req, res) => {
  try {
    const { classId, subjectId } = req.params;

    const link = await db.ClassSubject.findOne({ where: { classId, subjectId } });

    if (!link) {
      return res.status(404).json({ message: "This subject is not assigned to this class" });
    }

    await link.destroy();

    return res.status(200).json({ message: "Subject removed from class" });
  } catch (error) {
    console.error("Remove class subject error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};