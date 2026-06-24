export default (sequelize, DataTypes) => {
  const Term = sequelize.define(
    "Term",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.ENUM("FIRST", "SECOND", "THIRD"),
        allowNull: false,
      },
      sessionId: {
        type: DataTypes.UUID,
        allowNull: false,
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
      tableName: "terms",
      timestamps: true,
    }
  );

  Term.associate = (models) => {
    Term.belongsTo(models.Session, {
      foreignKey: "sessionId",
      as: "session",
    });
  };

  return Term;
};