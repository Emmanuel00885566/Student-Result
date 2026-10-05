import bcrypt from "bcrypt";
import db from "../../models/index.js";

export const createTeacher = async (req, res) => {
  const t = await db.sequelize.transaction();

  try {
    const { firstName, lastName, email, staffId, password } = req.body;

    if (!firstName || !lastName || !email || !staffId || !password) {
      await t.rollback();
      return res.status(400).json({
        message: "firstName, lastName, email, staffId, and password are all required",
      });
    }

    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      await t.rollback();
      return res.status(409).json({ message: "A user with this email already exists" });
    }

    const existingStaffId = await db.Teacher.findOne({ where: { staffId } });
    if (existingStaffId) {
      await t.rollback();
      return res.status(409).json({ message: "A teacher with this staffId already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.User.create(
      {
        schoolId: req.user.schoolId,
        email,
        password: hashedPassword,
        role: "teacher",
      },
      { transaction: t }
    );

    const newTeacher = await db.Teacher.create(
      {
        userId: newUser.id,
        firstName,
        lastName,
        staffId,
      },
      { transaction: t }
    );

    await t.commit();

    return res.status(201).json({
      message: "Teacher created",
      teacher: {
        id: newTeacher.id,
        firstName: newTeacher.firstName,
        lastName: newTeacher.lastName,
        staffId: newTeacher.staffId,
        email: newUser.email,
      },
    });
  } catch (error) {
    await t.rollback();
    console.error("Create teacher error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getTeachers = async (req, res) => {
  try {
    const teachers = await db.Teacher.findAll({
      include: [{ model: db.User, as: "user", attributes: ["email", "isActive"] }],
      order: [["firstName", "ASC"]],
    });
    return res.status(200).json({ teachers });
  } catch (error) {
    console.error("Get teachers error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await db.Teacher.findByPk(id, {
      include: [{ model: db.User, as: "user", attributes: ["email", "isActive"] }],
    });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    return res.status(200).json({ teacher });
  } catch (error) {
    console.error("Get teacher error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await db.Teacher.findByPk(id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Deleting the User cascades to delete the Teacher too (onDelete: 'CASCADE' from our migration)
    await db.User.destroy({ where: { id: teacher.userId } });

    return res.status(200).json({ message: "Teacher deleted" });
  } catch (error) {
    console.error("Delete teacher error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};