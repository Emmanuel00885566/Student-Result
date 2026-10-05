import db from "../../models/index.js";

export const createSubject = async (req, res) => {
  try {
    const { name, code } = req.body;

    if (!name) {
      return res.status(400).json({ message: "name is required" });
    }

    const existing = await db.Subject.findOne({ where: { name } });
    if (existing) {
      return res.status(409).json({ message: "A subject with this name already exists" });
    }

    const newSubject = await db.Subject.create({ name, code });

    return res.status(201).json({ message: "Subject created", subject: newSubject });
  } catch (error) {
    console.error("Create subject error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const subjects = await db.Subject.findAll({ order: [["name", "ASC"]] });
    return res.status(200).json({ subjects });
  } catch (error) {
    console.error("Get subjects error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await db.Subject.findByPk(id);

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    return res.status(200).json({ subject });
  } catch (error) {
    console.error("Get subject error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, isActive } = req.body;

    const subject = await db.Subject.findByPk(id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    await subject.update({ name, code, isActive });

    return res.status(200).json({ message: "Subject updated", subject });
  } catch (error) {
    console.error("Update subject error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await db.Subject.findByPk(id);

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    await subject.destroy();

    return res.status(200).json({ message: "Subject deleted" });
  } catch (error) {
    console.error("Delete subject error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};