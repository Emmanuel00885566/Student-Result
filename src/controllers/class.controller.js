import db from "../../models/index.js";

export const createClass = async (req, res) => {
  try {
    const { name, level, arm } = req.body;

    if (!name || !level) {
      return res.status(400).json({ message: "name and level are required" });
    }

    const existing = await db.Class.findOne({ where: { name } });
    if (existing) {
      return res.status(409).json({ message: "A class with this name already exists" });
    }

    const newClass = await db.Class.create({ name, level, arm });

    return res.status(201).json({ message: "Class created", class: newClass });
  } catch (error) {
    console.error("Create class error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getClasses = async (req, res) => {
  try {
    const classes = await db.Class.findAll({ order: [["name", "ASC"]] });
    return res.status(200).json({ classes });
  } catch (error) {
    console.error("Get classes error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getClassById = async (req, res) => {
  try {
    const { id } = req.params;
    const classItem = await db.Class.findByPk(id);

    if (!classItem) {
      return res.status(404).json({ message: "Class not found" });
    }

    return res.status(200).json({ class: classItem });
  } catch (error) {
    console.error("Get class error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, level, arm, isActive } = req.body;

    const classItem = await db.Class.findByPk(id);
    if (!classItem) {
      return res.status(404).json({ message: "Class not found" });
    }

    await classItem.update({ name, level, arm, isActive });

    return res.status(200).json({ message: "Class updated", class: classItem });
  } catch (error) {
    console.error("Update class error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const classItem = await db.Class.findByPk(id);

    if (!classItem) {
      return res.status(404).json({ message: "Class not found" });
    }

    await classItem.destroy();

    return res.status(200).json({ message: "Class deleted" });
  } catch (error) {
    console.error("Delete class error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};