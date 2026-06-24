'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('teachers', 'userId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.removeColumn('teachers', 'email');
    await queryInterface.removeColumn('teachers', 'password');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('teachers', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });

    await queryInterface.addColumn('teachers', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.removeColumn('teachers', 'userId');
  },
};