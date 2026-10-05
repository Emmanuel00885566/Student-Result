'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('grading_settings', {
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

      caWeight: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 40,
      },

      examWeight: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 60,
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

    // One school = one grading config (keeps it simple for V1)
    await queryInterface.addConstraint('grading_settings', {
      fields: ['schoolId'],
      type: 'unique',
      name: 'unique_school_grading_settings',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('grading_settings');
  },
};