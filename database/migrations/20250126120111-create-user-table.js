'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("users", {
      user_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      first_name: { type: Sequelize.STRING(50), allowNull: false },
      last_name: { type: Sequelize.STRING(50), allowNull: false },
      email: { type: Sequelize.STRING(100), unique: true, allowNull: false, validate: { isEmail: true } },
      password: { type: Sequelize.STRING(255), allowNull: false, validate: { min: 8, max: 20 } },
      avatar: { type: Sequelize.JSONB, defaultValue: null, allowNull: true },
      mobile: { type: Sequelize.STRING(10), allowNull: false },
      active: { type: Sequelize.BOOLEAN, defaultValue: true, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), },
    });

    await queryInterface.addIndex("users", ["email", "mobile"]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable("users")
  }
};
