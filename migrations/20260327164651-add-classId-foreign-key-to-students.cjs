'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('students', {
      fields: ['classId'],
      type: 'foreign key',
      name: 'fk_students_classId',
      references: {
        table: 'classes',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('students', 'fk_students_classId');
  },
};