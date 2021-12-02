const pgdb = require('../util/postgres-database');

const User = {}

User.create = (data) =>{
    const bindings = [...data];
    const SQL_CREATE_USER = `INSERT INTO users (username, email) VALUES ($1, $2)`;
    return pgdb.query(SQL_CREATE_USER, bindings)
}

module.exports = User