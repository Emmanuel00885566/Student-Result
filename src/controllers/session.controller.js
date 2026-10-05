import db from "../../models/index.js";

export const createSession = async (req, res) => {
  try {
    const { name, startDate, endDate } = req.body;

    if (!name) {
      return res.status(400).json({ message: "name is required" });
    }

    const existing = await db.Session.findOne({ where: { name } });
    if (existing) {
      return res.status(409).json({ message: "A session with this name already exists" });
    }

    const newSession = await db.Session.create({ name, startDate, endDate });

    return res.status(201).json({ message: "Session created", session: newSession });
  } catch (error) {
    console.error("Create session error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getSessions = async (req, res) => {
  try {
    const sessions = await db.Session.findAll({
      order: [["startDate", "DESC"]],
      include: [{ model: db.Term, as: "terms" }],
    });
    return res.status(200).json({ sessions });
  } catch (error) {
    console.error("Get sessions error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getSessionById = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await db.Session.findByPk(id, {
      include: [{ model: db.Term, as: "terms" }],
    });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    return res.status(200).json({ session });
  } catch (error) {
    console.error("Get session error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, startDate, endDate, isActive } = req.body;

    const session = await db.Session.findByPk(id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    await session.update({ name, startDate, endDate, isActive });

    return res.status(200).json({ message: "Session updated", session });
  } catch (error) {
    console.error("Update session error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await db.Session.findByPk(id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    await session.destroy();

    return res.status(200).json({ message: "Session deleted" });
  } catch (error) {
    console.error("Delete session error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};