export default (sequelize, DataTypes) => {
  const GradingSetting = sequelize.define(
    "GradingSetting",
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
      caWeight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 40,
      },
      examWeight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 60,
      },
    },
    {
      tableName: "grading_settings",
      timestamps: true,
    }
  );

  GradingSetting.associate = (models) => {
    GradingSetting.belongsTo(models.School, {
      foreignKey: "schoolId",
      as: "school",
    });
  };

  return GradingSetting;
};