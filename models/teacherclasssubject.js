export default (sequelize, DataTypes) => {
  const TeacherClassSubject = sequelize.define(
    "TeacherClassSubject",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      teacherId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      classId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      subjectId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      tableName: "teacher_class_subjects",
      timestamps: true,
    }
  );

  TeacherClassSubject.associate = (models) => {
    TeacherClassSubject.belongsTo(models.Teacher, {
      foreignKey: "teacherId",
      as: "teacher",
    });

    TeacherClassSubject.belongsTo(models.Class, {
      foreignKey: "classId",
      as: "class",
    });

    TeacherClassSubject.belongsTo(models.Subject, {
      foreignKey: "subjectId",
      as: "subject",
    });
  };

  return TeacherClassSubject;
};
