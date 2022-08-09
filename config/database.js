const knex = require('knex');
const { Model } = require('objection');

const knexfile = require('./knexfile');

let db;
if (process.env === 'production') {
  console.log('db for prod');
  db = knex(knexfile.production);
} else {
  console.log('db for dev');
  db = knex(knexfile.development);
}

const setupDb = () => {
  Model.knex(db);
};

module.exports = { setupDb, db };
