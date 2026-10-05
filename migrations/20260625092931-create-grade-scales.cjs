'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('grade_scales', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      schoolId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'schools',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      grade: {
        type: Sequelize.STRING,
        allowNull: false, // e.g. "A1", "B2", "F9"
      },

      minScore: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      maxScore: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      remark: {
        type: Sequelize.STRING,
        allowNull: false, // e.g. "Excellent", "Good", "Fail"
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
    await queryInterface.dropTable('grade_scales');
  },
};