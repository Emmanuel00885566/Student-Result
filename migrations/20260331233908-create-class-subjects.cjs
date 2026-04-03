'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('class_subjects', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      classId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'classes',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      subjectId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'subjects',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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

    // 🔒 Prevent duplicate assignments
    await queryInterface.addConstraint('class_subjects', {
      fields: ['classId', 'subjectId'],
      type: 'unique',
      name: 'unique_class_subject_pair',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('class_subjects');
  },
};