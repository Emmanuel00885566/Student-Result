export default (sequelize, DataTypes) => {
  const Teacher = sequelize.define(
    "Teacher",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      staffId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "teachers",
      timestamps: true,
    }
  );

  Teacher.associate = (models) => {
    Teacher.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });

    Teacher.hasMany(models.TeacherClassSubject, {
      foreignKey: "teacherId",
      as: "assignments",
    });
  };

  
  return Teacher;
};