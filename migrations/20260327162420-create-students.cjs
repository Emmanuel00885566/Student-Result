'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('students', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      otherName: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      regNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      gender: {
        type: Sequelize.ENUM('male', 'female'),
        allowNull: false,
      },

      dateOfBirth: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      classId: {
        type: Sequelize.UUID,
        allowNull: true, // will enforce later when class table exists
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
    await queryInterface.dropTable('students');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_students_gender";');
  },
};