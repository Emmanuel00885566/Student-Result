'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('results', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      studentId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'students', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      subjectId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'subjects', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      classId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'classes', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      termId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'terms', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      enteredBy: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'teachers', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },

      ca1: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },

      ca2: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },

      ca3: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },

      examScore: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },

      totalScore: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },

      grade: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      remark: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      isLocked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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

    // One result per student+subject+term — prevents duplicate score rows
    await queryInterface.addConstraint('results', {
      fields: ['studentId', 'subjectId', 'termId'],
      type: 'unique',
      name: 'unique_student_subject_term_result',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('results');
  },
};