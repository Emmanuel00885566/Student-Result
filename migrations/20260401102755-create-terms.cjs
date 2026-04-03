'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('terms', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      name: {
        type: Sequelize.ENUM('FIRST', 'SECOND', 'THIRD'),
        allowNull: false,
      },

      sessionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'sessions',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      startDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },

      endDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },

      isActive: {
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

    // 🔒 Prevent duplicate terms in same session
    await queryInterface.addConstraint('terms', {
      fields: ['sessionId', 'name'],
      type: 'unique',
      name: 'unique_session_term',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('terms');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_terms_name";');
  },
};