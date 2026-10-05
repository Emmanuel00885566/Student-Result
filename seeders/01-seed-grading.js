import "dotenv/config";
import db from "../models/index.js";

const seedGrading = async () => {
  try {
    await db.sequelize.authenticate();

    const school = await db.School.findOne({ where: { name: "Brookstone School" } });

    if (!school) {
      console.error("❌ Brookstone School not found. Run the admin seeder first.");
      process.exit(1);
    }

    await db.GradingSetting.create({
      schoolId: school.id,
      caWeight: 40,
      examWeight: 60,
    });

    const scale = [
      { grade: "A1", minScore: 75, maxScore: 100, remark: "Excellent" },
      { grade: "B2", minScore: 70, maxScore: 74, remark: "Very Good" },
      { grade: "B3", minScore: 65, maxScore: 69, remark: "Good" },
      { grade: "C4", minScore: 60, maxScore: 64, remark: "Credit" },
      { grade: "C5", minScore: 55, maxScore: 59, remark: "Credit" },
      { grade: "C6", minScore: 50, maxScore: 54, remark: "Credit" },
      { grade: "D7", minScore: 45, maxScore: 49, remark: "Pass" },
      { grade: "E8", minScore: 40, maxScore: 44, remark: "Pass" },
      { grade: "F9", minScore: 0, maxScore: 39, remark: "Fail" },
    ];

    for (const item of scale) {
      await db.GradeScale.create({ schoolId: school.id, ...item });
    }

    console.log("✅ Grading settings and grade scale seeded for Brookstone");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedGrading();