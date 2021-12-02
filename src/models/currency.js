const pgdb = require('../util/postgres-database');

const Currency = {}

Currency.create = (data)=>{
    const bindings = [...data];
    const SQL_CREATE_CURRENCY = `INSERT INTO currency (descriotion) values ($1))`;
    return pgdb.query(SQL_CREATE_CURRENCY, bindings)
}


Currency.findById = (data)=>{
    const bindings = [...data];
    const SQL_SELECT_CURRENCY = `SELECT id, description, to_char(created_at, 'DD-MM-YYYY') as "date" FROM currency WHERE id = $1`;
    return pgdb.query(SQL_SELECT_CURRENCY, bindings)
}

Currency.fetchAll = ()=>{
    const SQL_SELECT_CURRENCIES = `SELECT id, description, to_char(created_at, 'DD-MM-YY') as "date" FROM currency`;
    return pgdb.query(SQL_SELECT_CURRENCIES)
}

module.exports = Currency