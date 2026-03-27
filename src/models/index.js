import sequelize from "../config/database.js";
import Sequelize from "sequelize";

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;