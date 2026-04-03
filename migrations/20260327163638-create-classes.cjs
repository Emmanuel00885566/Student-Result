'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('classes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // prevents duplicate class names
      },

      level: {
        type: Sequelize.ENUM('JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3'),
        allowNull: false,
      },

      arm: {
        type: Sequelize.STRING,
        allowNull: true, // e.g., A, B, Science, Commercial
      },

      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('classes');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_classes_level";');
  },
};