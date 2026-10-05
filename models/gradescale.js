export default (sequelize, DataTypes) => {
  const GradeScale = sequelize.define(
    "GradeScale",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      schoolId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      grade: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      minScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maxScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      remark: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "grade_scales",
      timestamps: true,
    }
  );

  GradeScale.associate = (models) => {
    GradeScale.belongsTo(models.School, {
      foreignKey: "schoolId",
      as: "school",
    });
  };

  return GradeScale;
};