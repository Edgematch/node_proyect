const pgdb = require('../util/postgres-database');

const Category = {};

Category.create = (data) => {
  const bindings = [...data];
  const SQL_CREATE_CATEGORY = `INSERT INTO category
                                        (description, category_type) VALUES ($1, $2)`;
  return pgdb.query(SQL_CREATE_CATEGORY, bindings);
};

Category.findById = (data) => {
  const bindings = [...data];
  const SQL_SELECT_CATEGORY = `SELECT id, description, category_type, to_char(created_at, 'DD-MM-YYYY') as "date"
                                        FROM category WHERE id = $1`;
  return pgdb.query(SQL_SELECT_CATEGORY, bindings);
};

Category.fetchAll = () => {
  const SQl_SELECT_CATEGORIES = `SELECT id, description, category_type, to_char(created_at, 'DD-MM-YYYY') as "date"
                                        FROM category`;
  return pgdb.query(SQl_SELECT_CATEGORIES);
};

module.exports = Category;
