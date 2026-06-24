export default (sequelize, DataTypes) => {
  const ClassSubject = sequelize.define(
    "ClassSubject",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
      tableName: "class_subjects",
      timestamps: true,
    }
  );

  ClassSubject.associate = (models) => {
    ClassSubject.belongsTo(models.Class, {
      foreignKey: "classId",
      as: "class",
    });

    ClassSubject.belongsTo(models.Subject, {
      foreignKey: "subjectId",
      as: "subject",
    });
  };

  return ClassSubject;
};