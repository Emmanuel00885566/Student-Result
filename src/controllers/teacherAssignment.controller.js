import db from "../../models/index.js";

export const assignTeacher = async (req, res) => {
  try {
    const { teacherId, classId, subjectId } = req.body;

    if (!teacherId || !classId || !subjectId) {
      return res.status(400).json({
        message: "teacherId, classId, and subjectId are all required",
      });
    }

    const teacher = await db.Teacher.findByPk(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const classItem = await db.Class.findByPk(classId);
    if (!classItem) {
      return res.status(404).json({ message: "Class not found" });
    }

    const subject = await db.Subject.findByPk(subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Make sure this class is actually allowed to have this subject
    const classSubjectLink = await db.ClassSubject.findOne({ where: { classId, subjectId } });
    if (!classSubjectLink) {
      return res.status(400).json({
        message: "This subject is not assigned to this class yet. Assign the subject to the class first.",
      });
    }

    const existing = await db.TeacherClassSubject.findOne({
      where: { teacherId, classId, subjectId },
    });
    if (existing) {
      return res.status(409).json({ message: "This teacher is already assigned to this class and subject" });
    }

    const assignment = await db.TeacherClassSubject.create({ teacherId, classId, subjectId });

    return res.status(201).json({ message: "Teacher assigned", assignment });
  } catch (error) {
    console.error("Assign teacher error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAssignmentsForTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const teacher = await db.Teacher.findByPk(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const assignments = await db.TeacherClassSubject.findAll({
      where: { teacherId },
      include: [
        { model: db.Class, as: "class" },
        { model: db.Subject, as: "subject" },
      ],
    });

    return res.status(200).json({
      teacher: `${teacher.firstName} ${teacher.lastName}`,
      assignments,
    });
  } catch (error) {
    console.error("Get teacher assignments error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAssignmentsForClass = async (req, res) => {
  try {
    const { classId } = req.params;

    const classItem = await db.Class.findByPk(classId);
    if (!classItem) {
      return res.status(404).json({ message: "Class not found" });
    }

    const assignments = await db.TeacherClassSubject.findAll({
      where: { classId },
      include: [
        { model: db.Teacher, as: "teacher", attributes: ["firstName", "lastName", "staffId"] },
        { model: db.Subject, as: "subject" },
      ],
    });

    return res.status(200).json({ class: classItem.name, assignments });
  } catch (error) {
    console.error("Get class assignments error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const removeAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    const assignment = await db.TeacherClassSubject.findByPk(id);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    await assignment.destroy();

    return res.status(200).json({ message: "Assignment removed" });
  } catch (error) {
    console.error("Remove assignment error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};