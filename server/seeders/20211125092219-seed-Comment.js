"use strict";

const fs = require(`fs`)

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = JSON.parse(fs.readFileSync("./data/comments.json", "utf8"))
    data.forEach(each => {
      delete each.id
      each.createdAt = new Date()
      each.updatedAt = new Date()
    })
    
   await queryInterface.bulkInsert("Comments", data);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Comments", null, {});
  }
};
