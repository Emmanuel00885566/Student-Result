export default (sequelize, DataTypes) => {
  const Subject = sequelize.define(
    "Subject",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "subjects",
      timestamps: true,
    }
  );

  Subject.associate = (models) => {
    Subject.belongsToMany(models.Class, {
      through: models.ClassSubject,
      foreignKey: "subjectId",
      otherKey: "classId",
      as: "classes",
    });

    Subject.hasMany(models.TeacherClassSubject, {
      foreignKey: "subjectId",
      as: "teacherAssignments",
    });
  };

  return Subject;
};