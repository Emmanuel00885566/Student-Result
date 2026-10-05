export default (sequelize, DataTypes) => {
  const Result = sequelize.define(
    "Result",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      studentId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      subjectId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      classId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      termId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      enteredBy: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      ca1: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      ca2: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      ca3: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      examScore: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      totalScore: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      grade: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      remark: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isLocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "results",
      timestamps: true,
    }
  );

  Result.associate = (models) => {
    Result.belongsTo(models.Student, { foreignKey: "studentId", as: "student" });
    Result.belongsTo(models.Subject, { foreignKey: "subjectId", as: "subject" });
    Result.belongsTo(models.Class, { foreignKey: "classId", as: "class" });
    Result.belongsTo(models.Term, { foreignKey: "termId", as: "term" });
    Result.belongsTo(models.Teacher, { foreignKey: "enteredBy", as: "teacher" });
  };

  return Result;
};