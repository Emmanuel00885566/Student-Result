export default (sequelize, DataTypes) => {
  const Class = sequelize.define(
    "Class",
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
      level: {
        type: DataTypes.ENUM("JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"),
        allowNull: false,
      },
      arm: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "classes",
      timestamps: true,
    }
  );

  Class.associate = (models) => {
    Class.hasMany(models.Student, {
      foreignKey: "classId",
      as: "students",
    });

    Class.belongsToMany(models.Subject, {
      through: models.ClassSubject,
      foreignKey: "classId",
      otherKey: "subjectId",
      as: "subjects",
    });

    Class.hasMany(models.TeacherClassSubject, {
      foreignKey: "classId",
      as: "teacherAssignments",
    });
  };

  return Class;
};