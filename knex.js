const knex = require("knex");
const knexfile = require("./knexfile");
const { Model } = require("objection");

const initializeDB = () => {
  const db = knex(knexfile.development);
  Model.knex(db);
};

module.exports = { initializeDB };