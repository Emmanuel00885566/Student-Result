import db from "../../models/index.js";
import { calculateResult } from "../utils/grading.js";

// Helper: confirms the logged-in teacher is actually assigned to this class+subject
const verifyTeacherAssignment = async (userId, classId, subjectId) => {
  const teacher = await db.Teacher.findOne({ where: { userId } });
  if (!teacher) return { allowed: false, teacher: null };

  const assignment = await db.TeacherClassSubject.findOne({
    where: { teacherId: teacher.id, classId, subjectId },
  });

  return { allowed: !!assignment, teacher };
};

export const enterResult = async (req, res) => {
  try {
    const { studentId, subjectId, classId, termId, ca1, ca2, ca3, examScore } = req.body;

    if (!studentId || !subjectId || !classId || !termId) {
      return res.status(400).json({
        message: "studentId, subjectId, classId, and termId are required",
      });
    }

    const { allowed, teacher } = await verifyTeacherAssignment(req.user.userId, classId, subjectId);

    if (!teacher) {
      return res.status(403).json({ message: "You are not registered as a teacher" });
    }

    if (!allowed) {
      return res.status(403).json({
        message: "You are not assigned to teach this subject for this class",
      });
    }

    const student = await db.Student.findOne({ where: { id: studentId, classId } });
    if (!student) {
      return res.status(404).json({ message: "Student not found in this class" });
    }

    let result = await db.Result.findOne({ where: { studentId, subjectId, termId } });

    if (result && result.isLocked) {
      return res.status(423).json({ message: "This result is locked and cannot be edited" });
    }

    const gradeScales = await db.GradeScale.findAll({ raw: true });
    const { totalScore, grade, remark } = calculateResult({ ca1, ca2, ca3, examScore, gradeScales });

    if (result) {
      await result.update({ ca1, ca2, ca3, examScore, totalScore, grade, remark, enteredBy: teacher.id });
    } else {
      result = await db.Result.create({
        studentId,
        subjectId,
        classId,
        termId,
        enteredBy: teacher.id,
        ca1,
        ca2,
        ca3,
        examScore,
        totalScore,
        grade,
        remark,
      });
    }

    return res.status(200).json({ message: "Result saved", result });
  } catch (error) {
    console.error("Enter result error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getResultsForClassSubject = async (req, res) => {
  try {
    const { classId, subjectId, termId } = req.query;

    if (!classId || !subjectId || !termId) {
      return res.status(400).json({ message: "classId, subjectId, and termId are required" });
    }

    const { allowed, teacher } = await verifyTeacherAssignment(req.user.userId, classId, subjectId);

    if (!teacher || !allowed) {
      return res.status(403).json({ message: "You are not assigned to this class and subject" });
    }

    const results = await db.Result.findAll({
      where: { classId, subjectId, termId },
      include: [{ model: db.Student, as: "student", attributes: ["firstName", "lastName", "regNumber"] }],
    });

    return res.status(200).json({ results });
  } catch (error) {
    console.error("Get results error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
