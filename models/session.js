export default (sequelize, DataTypes) => {
  const Session = sequelize.define(
    "Session",
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
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "sessions",
      timestamps: true,
    }
  );

  Session.associate = (models) => {
    Session.hasMany(models.Term, {
      foreignKey: "sessionId",
      as: "terms",
    });
  };

  return Session;
};