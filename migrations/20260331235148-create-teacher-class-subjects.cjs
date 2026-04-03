'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teacher_class_subjects', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      teacherId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'teachers',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
    await queryInterface.addConstraint('teacher_class_subjects', {
      fields: ['teacherId', 'classId', 'subjectId'],
      type: 'unique',
      name: 'unique_teacher_class_subject',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('teacher_class_subjects');
  },
};