import db from "../../models/index.js";

export const createTerm = async (req, res) => {
  try {
    const { name, sessionId, startDate, endDate } = req.body;

    if (!name || !sessionId) {
      return res.status(400).json({ message: "name and sessionId are required" });
    }

    const session = await db.Session.findByPk(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const existing = await db.Term.findOne({ where: { name, sessionId } });
    if (existing) {
      return res.status(409).json({ message: "This term already exists for this session" });
    }

    const newTerm = await db.Term.create({ name, sessionId, startDate, endDate });

    return res.status(201).json({ message: "Term created", term: newTerm });
  } catch (error) {
    console.error("Create term error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getTerms = async (req, res) => {
  try {
    const terms = await db.Term.findAll({
      include: [{ model: db.Session, as: "session" }],
      order: [["createdAt", "ASC"]],
    });
    return res.status(200).json({ terms });
  } catch (error) {
    console.error("Get terms error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getTermById = async (req, res) => {
  try {
    const { id } = req.params;
    const term = await db.Term.findByPk(id, {
      include: [{ model: db.Session, as: "session" }],
    });

    if (!term) {
      return res.status(404).json({ message: "Term not found" });
    }

    return res.status(200).json({ term });
  } catch (error) {
    console.error("Get term error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateTerm = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, startDate, endDate, isActive } = req.body;

    const term = await db.Term.findByPk(id);
    if (!term) {
      return res.status(404).json({ message: "Term not found" });
    }

    await term.update({ name, startDate, endDate, isActive });

    return res.status(200).json({ message: "Term updated", term });
  } catch (error) {
    console.error("Update term error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteTerm = async (req, res) => {
  try {
    const { id } = req.params;
    const term = await db.Term.findByPk(id);

    if (!term) {
      return res.status(404).json({ message: "Term not found" });
    }

    await term.destroy();

    return res.status(200).json({ message: "Term deleted" });
  } catch (error) {
    console.error("Delete term error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};