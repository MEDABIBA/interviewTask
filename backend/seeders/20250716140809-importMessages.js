'use strict';
const { IGNORE } = require('sequelize/lib/index-hints');
// const  message = require("../models/message")
const messages = require('../data.js');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Messages',messages, {ignoreDuplicates: true});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
