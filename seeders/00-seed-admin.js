import "dotenv/config";
import bcrypt from "bcrypt";
import db from "../models/index.js";

const seedAdmin = async () => {
  try {
    await db.sequelize.authenticate();

    const school = await db.School.create({
      name: "Brookstone School",
      address: "Lagos, Nigeria",
      email: "info@brookstone.test",
    });

    const hashedPassword = await bcrypt.hash("Admin@12345", 10);

    const admin = await db.User.create({
      schoolId: school.id,
      email: "admin@brookstone.test",
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ School created:", school.name);
    console.log("✅ Admin created:", admin.email);
    console.log("🔑 Login with: admin@brookstone.test / Admin@12345");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedAdmin();